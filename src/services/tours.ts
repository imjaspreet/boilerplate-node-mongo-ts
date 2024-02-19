import { setGlobalEnvironment } from '../global'
import Environment from '../environments/environment'
const env: Environment = new Environment()
setGlobalEnvironment(env)
import Tour from '../models/tour'
import { IOptions, QueryResult } from '../helpers/paginate'
import { ITour, ITourDoc, ITourModel, createTour } from 'interfaces/tour'
import Recently from '../models/recently'

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
 * Create a Tour
 * @param {createTour} userBody
 * @returns {Promise<ITour>}
 */
export const create = async (userBody: createTour): Promise<ITour> => {
  return await Tour.create(userBody)
}

/**
 *
 * @param id
 * @param model
 * @returns
 */
export const update = async (
  id: string,
  model: ITourModel,
): Promise<ITourDoc> => {
  const entity: ITourModel | null = await Tour.findById(id)

  if (entity) {
    set(model, entity)
    await entity.save()
  }
  return entity as unknown as ITourDoc
}

export const getById = async (id: string): Promise<ITourDoc | null> => {
  return await Tour.findById(id)
}

export const getByCondition = async (condition: {
  email?: string
}): Promise<ITour | null> => {
  return await Tour.findOne(condition)
}

export const get = async (
  query: string | { id?: string; email?: string },
): Promise<ITour | null> => {
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
  const Tours = await Tour.paginate(filter, options)
  return Tours
}

export const deleteOne = async (id: string): Promise<string | null> => {
  const Tour: ITourDoc | null = await getById(id)

  if (!Tour) {
    return 'Tour not found'
  }

  await Tour.deleteOne()
  return 'Tour deleted successfully'
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
        { name: new RegExp(query.search, 'i') },
        // { city: new RegExp(query.search, 'i') },
        // { state: new RegExp(query.search, 'i') },
      ]
    }

    const maxDistance: number = query.maxDistance | 10000
    const result = await Tour.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [+query.long, +query.lat],
          },
          distanceField: 'distance',
          maxDistance: 1000,
          query: where,
          includeLocs: 'location',
          spherical: true,
        },
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: 1,
          },
        },
      },
    ])

    const count = result.length > 0 ? result[0].count : 0

    let items: ITourDoc[]
    if (page) {
      items = await findWithPagination(page, query, maxDistance, where)
    } else {
      items = await find(page, query, maxDistance, where)
    }
    for (const item of items) {
      const data = await Recently.findOne({
        user: query.user,
        Tour: item.id,
        isTourLike: true,
      })
      if (data) {
        item.isFavourite = true
      }
    }

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
 * @param {object} where
 * @returns
 */
const findWithPagination = async (page, query, maxDistance, where) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pipeline: any = [
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [+query.long, +query.lat],
        },
        distanceField: 'distance',
        maxDistance,
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

  const items = await Tour.aggregate(pipeline)
  return items
}

/**
 *
 * @param {any} page
 * @param {object}query
 * @param {number} maxDistance
 * @param {object} where
 * @returns
 */
const find = async (page, query, maxDistance, where) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const items: ITourDoc[] = await Tour.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [+query.long, +query.lat],
          },
          distanceField: 'distance',
          maxDistance,
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
