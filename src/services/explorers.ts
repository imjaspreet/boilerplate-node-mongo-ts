import { TextService } from './../interfaces/explorer'
// import httpStatus from 'http-status'
import Explorer from '../models/explorer'
import * as explorerM from '../mappers/explorer'
import { IOptions, QueryResult } from '../helpers/paginate'
import {
  IExplorer,
  IExplorerDoc,
  IExplorerModel,
  createExplorer,
  TextServiceArray,
  // TextService,
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
  // eslint-disable-next-line no-useless-catch
  try {
    const where = {}
    const maxDistance: number = query.maxDistance | 1000
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
  } catch (error) {
    throw error
  }
}

const findLocation = async (
  lon: Float32Array,
  lat: Float32Array,
  option: object,
  query: object,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entities: TextServiceArray | any = await fetch.get(
    `http://13.50.197.125:5001/api/POIs?lon=${lon}&lat=${lat}`,
    {},
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = await textService(entities)
  //   // await shortDescription(entities)
  await Explorer.insertMany(explorerM.toCreateArrayModel(data))
  return await list(option, query)
}

const textService = async (entities: [TextService]) => {
  const result = entities.map(async (item: TextService) => {
    const response: object = await fetch.get(
      `http://13.50.197.125:5002/api/text?name=${item.name}&city=${item.city}&country=${item.country}&lon=${item.longitude}&lat=${item.latitude}&adventurePointImportance=${item.importance}`,
      {},
    )
    return response
  })
  return result
}

// const shortDescription = async (entities: [TextService]) => {

//   const result = entities.map(async (item: TextService) => {
//     const response: object = await fetch.get(
//       ` (http://localhost:5050/api/description?name=${item.name}&city=${item.city}&country=${item.country}`,
//       {},
//     )
//     return response
//   })
//   return result
// }
