import Recently from '../models/recently'
import { IOptions, QueryResult } from '../helpers/paginate'
import {
  IRecently,
  IRecentlyDoc,
  IRecentlyModel,
  createRecently,
} from 'interfaces/recently'

const populate = [{ path: 'explorer' }]
/**
 *
 * @param model
 * @param entity
 * @returns
 */
const set = <T>(model: T, entity: T): T => {
  Object.assign(entity, model)
  return entity
}

/**
 * Create a explorer
 * @param {createRecently} userBody
 * @returns {Promise<IExplorer>}
 */
export const create = async (
  userBody: createRecently,
): Promise<IRecentlyDoc> => {
  return await Recently.create({
    ...userBody,
    isView: true,
  })
}

/**
 *
 * @param id
 * @param model
 * @returns
 */
export const update = async (
  id: string,
  model: IRecentlyModel,
): Promise<IRecentlyDoc> => {
  const entity: IRecentlyModel | null = await Recently.findById(id)

  if (entity) {
    set(model, entity)
    await entity.save()
  }
  return entity as unknown as IRecentlyDoc
}

export const getById = async (id: string): Promise<IRecentlyDoc | null> => {
  return await Recently.findById(id).populate(populate)
}

export const getByCondition = async (condition: {
  email?: string
}): Promise<IRecently | null> => {
  return await Recently.findOne(condition)
}

export const get = async (
  query: string | { id?: string; email?: string },
): Promise<IRecently | null> => {
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
  const recently = await Recently.paginate(filter, options)
  return recently
}

export const deleteOne = async (id: string): Promise<string | null> => {
  const explorer: IRecentlyDoc | null = await getById(id)

  if (!explorer) {
    return 'Recently view not found'
  }

  await explorer.deleteOne()
  return 'Recently view deleted successfully'
}

export const favorite = async (
  userBody: createRecently,
): Promise<IRecentlyDoc> => {
  return await Recently.create({
    ...userBody,
    isLike: true,
  })
}
