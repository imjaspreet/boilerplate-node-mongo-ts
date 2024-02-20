import Language from '../models/language'
import { IOptions, QueryResult } from '../helpers/paginate'
import {
  ILanguage,
  ILanguageDoc,
  ILanguageModel,
  createLanguage,
} from '../interfaces/language'

const set = <T>(model: T, entity: T): T => {
  Object.assign(entity, model)
  return entity
}

/**
 * Create a explorer
 * @param {createLanguage} userBody
 * @returns {Promise<IExplorer>}
 */
export const create = async (
  userBody: createLanguage,
): Promise<ILanguageDoc> => {
  return await Language.create(userBody)
}

/**
 *
 * @param id
 * @param model
 * @returns
 */
export const update = async (
  id: string,
  model: ILanguageModel,
): Promise<ILanguageDoc> => {
  const entity: ILanguageModel | null = await Language.findById(id)

  if (entity) {
    set(model, entity)
    await entity.save()
  }
  return entity as unknown as ILanguageDoc
}

export const getById = async (id: string): Promise<ILanguageDoc | null> => {
  return await Language.findById(id)
}

export const getByCondition = async (condition: {
  email?: string
}): Promise<ILanguage | null> => {
  return await Language.findOne(condition)
}

export const get = async (
  query: string | { id?: string; email?: string },
): Promise<ILanguage | null> => {
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
  const recently = await Language.paginate(filter, options)
  return recently
}

export const deleteOne = async (id: string): Promise<string | null> => {
  const explorer: ILanguageDoc | null = await getById(id)

  if (!explorer) {
    return 'Recently view not found'
  }

  await explorer.deleteOne()
  return 'Recently view deleted successfully'
}
