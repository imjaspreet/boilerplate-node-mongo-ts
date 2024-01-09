// import httpStatus from 'http-status'
import Explorer from '../models/explorer'
import { IOptions, QueryResult } from '../helpers/paginate'
import {
  IExplorer,
  IExplorerDoc,
  IExplorerModel,
  createExplorer,
} from 'interfaces/explorer'

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
  filter: Record<string, any>,
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

export const list = async (query, user) => {
  const where = { user: { $ne: user.id } }

  const countAggregation = [
    { $match: where },
    { $group: { _id: null, count: { $sum: 1 } } },
  ]
  const count = await Explorer.aggregate(countAggregation)
  const items = await Explorer.aggregate([
    { $match: where },
    { $skip: query.skip },
    { $limit: query.limit },
    { $sort: query.sortBy },
  ])
  Explorer.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates: [-73.99279, 40.719296] },
        distanceField: 'dist.calculated',
        maxDistance: 200,
        includeLocs: 'dist.location',
        spherical: true,
      },
    },
  ])
  return { items, count }
}
