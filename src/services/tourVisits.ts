import { setGlobalEnvironment } from '../global'
import Environment from '../environments/environment'
const env: Environment = new Environment()
setGlobalEnvironment(env)
import TourVisit from '../models/tourVisit'
import { IOptions, QueryResult } from '../helpers/paginate'
import {
  ITourVisit,
  ITourVisitDoc,
  ITourVisitModel,
  TourVisitCreate,
} from '../interfaces/tourVisit'
import moment from 'moment'

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
 * @returns {Promise<ITourVisitDoc>}
 */
export const create = async (
  userBody: TourVisitCreate,
): Promise<ITourVisitDoc> => {
  const preVisit = await TourVisit.findOne({
    tour: userBody.tourId,
    user: userBody.userId,
    status: 'active',
    createdAt: {
      $gte: moment().format('YYYY-MM-DD'),
      $lte: moment().format('YYYY-MM-DD'),
    },
  })
  if (preVisit) {
    preVisit.locationCoordinate.push({
      latitude: userBody.latitude,
      longitude: userBody.longitude,
    })
    await preVisit.save()
  } else {
    return await TourVisit.create(userBody)
  }
}
/**
 *
 * @param id
 * @param model
 * @returns
 */
export const update = async (
  id: string,
  model: ITourVisitModel,
): Promise<ITourVisitDoc> => {
  const entity: ITourVisitModel | null = await TourVisit.findById(id)

  if (entity) {
    set(model, entity)
    await entity.save()
  }
  return entity as unknown as ITourVisitDoc
}

export const getById = async (id: string): Promise<ITourVisitDoc | null> => {
  return await TourVisit.findById(id)
}

export const getByCondition = async (condition: {
  email?: string
}): Promise<ITourVisit | null> => {
  return await TourVisit.findOne(condition)
}

export const get = async (
  query: string | { id?: string; email?: string },
): Promise<ITourVisitDoc | null> => {
  if (typeof query === 'string') {
    return getById(query as string)
  }

  if (query.id) {
    return getById((query as { id?: string }).id)
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
  const Tours = await TourVisit.paginate(filter, options)
  return Tours
}

export const deleteOne = async (id: string): Promise<string | null> => {
  const Tour: ITourVisitDoc | null = await getById(id)

  if (!Tour) {
    return 'Tour not found'
  }

  await Tour.deleteOne()
  return 'Tour deleted successfully'
}
