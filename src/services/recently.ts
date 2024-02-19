import Recently from '../models/recently'
import { IOptions, QueryResult } from '../helpers/paginate'
import {
  IRecently,
  IRecentlyDoc,
  IRecentlyModel,
  createRecently,
} from 'interfaces/recently'
import * as RecentlyM from '../mappers/recently'
const populate = [{ path: 'explorer' }, { path: 'user' }]
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
  const model = RecentlyM.toViewModel(userBody as IRecentlyDoc)
  const previousView: IRecentlyDoc = await Recently.findOne(model)

  if (previousView) {
    await previousView.deleteOne()
  }

  return await Recently.create(model)
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
): Promise<void> => {
  const entity: IRecentlyModel | null = await Recently.findById(id)

  if (entity) {
    set(model, entity)
    await entity.save()
  }
  entity
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await updateIsFavourite(recently as any, filter)
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

export const favorite = async (userBody: createRecently): Promise<string> => {
  const model = RecentlyM.toFavouriteModel(userBody as IRecentlyDoc)
  const found: IRecentlyDoc = await Recently.findOne(model)

  if (found) {
    await found.deleteOne()
    return 'Mark as unfavorite'
  } else {
    await Recently.create(model)
    return 'Mark as favorite'
  }
}
/**
 *
 * @param recently {IRecentlyDoc}
 * @param filter {Record<string, any>}
 * @returns {Promise<void>}
 */
const updateIsFavourite = async (
  recently: QueryResult,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter: Record<string, any>,
): Promise<void> => {
  if (
    (recently.items as IRecentlyDoc[]) &&
    filter &&
    filter.isView &&
    filter.user
  ) {
    for (const item of recently.items as IRecentlyDoc[]) {
      const data: IRecentlyDoc | null = await Recently.findOne({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        explorer: item.explorer as any,
        user: filter.user,
        isLike: true,
      }).select('_id isLike explorer')
      if (data) {
        item.isLike = true
      }
    }
  }
}
