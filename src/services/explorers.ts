// import httpStatus from 'http-status'
import Explorer from '../models/explorer'
import * as explorerM from '../mappers/explorer'
import { IOptions, QueryResult } from '../helpers/paginate'
import {
  IExplorer,
  IExplorerDoc,
  IExplorerModel,
  createExplorer,
  // textServiceArray,
  // textService,
} from 'interfaces/explorer'
import * as fetch from '../providers/fetch'
const set = <T>(model: T, entity: T): T => {
  Object.assign(entity, model)
  return entity
}

/**
 * Create a explorer
 * @param {createExplorer} userBody
 * @returns {Promise<IExplorer>}
 */
export const create = async (userBody: createExplorer): Promise<IExplorer> => {
  return await Explorer.create(userBody)
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

export const list = async (option, query) => {
  const where = {}
  const maxDistance: number = query.maxDistance | 1000
  const [{ count }] = await Explorer.aggregate([
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

  // const skip = (option.page - 1) * option.limit
  const items = await Explorer.aggregate([
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
  ])
  if (items.length == 0) {
    findLocation(query.long, query.lat, option, query)
  }
  return { items, count }
}

const findLocation = async (
  lon: Float32Array,
  lat: Float32Array,
  option: object,
  query: object,
) => {
  const entities: textServiceArray = await fetch.get(
    `http://localhost:5050/api/POIs?lon=${lon}&lat=${lat}`,
    {},
  )
  // await textService(entities)
  // await shortDescription(entities)
  await Explorer.insertMany(explorerM.toCreateArrayModel(entities))
  return await list(option, query)
}

// const textService = async (entities: textServiceArray) => {
//   const result = entities.map(async (item: textService) => {
//     const response: object = await fetch.get(
//       ` http://localhost:5051/api/text?name=${item.name}&city=${item.city}&country=${item.country}&lon=${item.longitude}&lat=${item.latitude}&adventurePointImportance=${item.importance}`,
//       {},
//     )
//     return response
//   })
//   return result
// }
// const shortDescription = async (entities: textServiceArray) => {
//   const result = entities.map(async (item: textService) => {
//     const response: object = await fetch.get(
//       ` (http://localhost:5050/api/description?name=${item.name}&city=${item.city}&country=${item.country}`,
//       {},
//     )
//     return response
//   })
//   return result
// }
