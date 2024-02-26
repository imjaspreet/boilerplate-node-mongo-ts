import { ITourVisitDoc } from '../interfaces/tourVisit'
import _ from 'underscore'
export const toModel = (entity: ITourVisitDoc) => {
  const model = {
    id: entity._id,
    latitude: entity.latitude,
    longitude: entity.longitude,
    location: entity.location,
    locationCoordinate: entity.locationCoordinate,
    user: null,
    tour: null,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  }
  if (entity.user) {
    model.user = entity.user
  }
  if (entity.tour) {
    model.tour = entity.tour
  }

  return model
}
export const toSearchModel = entities => {
  return _.map(entities, toModel)
}
