import { setGlobalEnvironment } from '../global'
import Environment from '../environments/environment'
const env: Environment = new Environment()
setGlobalEnvironment(env)
import Explorer from '../models/explorer'
import { IOptions, QueryResult } from '../helpers/paginate'
import {
  IExplorer,
  IExplorerDoc,
  IExplorerModel,
  createExplorer,
} from 'interfaces/explorer'
import Recently from '../models/recently'
import ApiError from '../utils/error/ApiError'
import httpStatus from 'http-status'
import Tour from '../models/tour'

/**
 * Set user object
 * @param {IUserModel} model
 * @param {IUser} entity
 * @returns {IUser}
 */
const set = <T>(model: T, entity: T): T => {
  Object.assign(entity, model)
  return entity
}

/**
 * Create a explorer
 * @param {createExplorer} userBody
 * @returns {Promise<IExplorerDoc>}
 */
export const create = async (
  userBody: createExplorer,
): Promise<IExplorerDoc> => {
  const explorer = await Explorer.findOne({
    latitude: userBody.latitude,
    longitude: userBody.longitude,
    tour: userBody.tour,
  })
  if (explorer) {
    throw new ApiError(httpStatus.CONFLICT, 'Spot already exist')
  }
  const entity: IExplorerDoc = await Explorer.create(userBody)
  const tour = await Tour.findById(userBody.tour)
  if (tour) {
    tour.explorers.push(entity._id)
  }
  return entity as IExplorerDoc
}

/**
 *
 * @param id
 * @param model
 * @returns
 */
export const update = async (
  id: string,
  model: IExplorerModel,
): Promise<IExplorerDoc> => {
  const entity: IExplorerModel | null = await Explorer.findById(id)

  if (entity) {
    set(model, entity)
    await entity.save()
  }
  return entity as unknown as IExplorerDoc
}

export const getById = async (id: string): Promise<IExplorerDoc | null> => {
  return await Explorer.findById(id)
}

export const getByCondition = async (condition: {
  email?: string
}): Promise<IExplorer | null> => {
  return await Explorer.findOne(condition)
}

export const get = async (
  query: string | { id?: string; email?: string },
): Promise<IExplorer | null> => {
  if (typeof query === 'string') {
    return getById(query as string)
  }

  if (query.id) {
    return getById((query as { id?: string }).id)
  }

  if (query.email) {
    return getByCondition({
      email: (query as { email?: string }).email,
    })
  }

  return null
}

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const search = async (
  filter: Record<string, object>,
  options: IOptions,
): Promise<QueryResult> => {
  const explorers = await Explorer.paginate(filter, options)
  return explorers
}

export const deleteOne = async (id: string): Promise<string | null> => {
  const explorer: IExplorerDoc | null = await getById(id)

  if (!explorer) {
    return 'User not found'
  }

  await explorer.deleteOne()
  return 'User deleted successfully'
}

/**
 *
 * @param {object} page
 * @param {object}query
 * @returns
 */
export const list = async (page, query) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const where = {}
    if (query.search) {
      where['$or'] = [
        { name: { $regex: query.search, $options: 'i' } },
        { city: { $regex: query.search, $options: 'i' } },
      ]
    }

    if (query.categories) {
      where['categories'] = { $in: query.categories }
    }
    if (query.properties) {
      where['properties'] = { $in: query.properties }
    }
    if (query.tourId) {
      where['tour'] = query.tourId
    }
    const maxDistance: number = query.maxDistance | 10000
    const result = await Explorer.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [query.long, query.lat],
          },
          distanceField: 'distance',
          maxDistance: maxDistance,
          query: where,
          includeLocs: 'location',
          spherical: true,
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ])

    // Check if the result is not found (null or undefined)
    const count = result.length > 0 ? result[0].count : 0

    let items: IExplorerDoc[]
    if (page) {
      items = await findWithPagination(page, query, maxDistance, where)
    } else {
      items = await find(page, query, maxDistance, where)
    }
    await updateFavourite(items, query)
    return { items, count }
  } catch (error) {
    throw error
  }
}

/**
 *
 * @param {object} page
 * @param {object}query
 * @param {number} maxDistance
 * @returns
 */
const findWithPagination = async (page, query, maxDistance, where) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pipeline: any = [
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [query.long, query.lat],
        },
        distanceField: 'distance',
        maxDistance: maxDistance,
        query: where,
        includeLocs: 'location',
        spherical: true,
      },
    },
    {
      $sort: page.sortBy || { createdAt: -1 },
    },
    {
      $skip: page.skip || 0,
    },
    {
      $limit: page.limit,
    },
  ]

  const items = await Explorer.aggregate(pipeline)
  return items
}

/**
 *
 * @param {any} page
 * @param {object}query
 * @param {number} maxDistance
 * @returns
 */
const find = async (page, query, maxDistance, where) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const items: IExplorerDoc[] = await Explorer.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [query.long, query.lat],
          },
          distanceField: 'distance',
          maxDistance: maxDistance,
          query: where,
          includeLocs: 'location',
          spherical: true,
        },
      },
      {
        $sort: page ? page.sortBy : { createdAt: -1 },
      },
    ])
    return items
  } catch (error) {
    throw error
  }
}

const updateFavourite = async (
  items: IExplorerDoc[],
  query: { userId: string },
) => {
  for (const item of items) {
    const data = await Recently.findOne({
      user: query.userId,
      explorer: item._id,
      isLike: true,
    })
    if (data) {
      item.isFavourite = true
    }
  }
  return items
}
