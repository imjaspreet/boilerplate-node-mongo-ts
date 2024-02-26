import { ITourVisitDoc } from '../interfaces/tourVisit'
import _ from 'underscore'
export const toModel = (entity: ITourVisitDoc) => {
  const model = {
    id: entity._id,
    latitude: entity.latitude,
    longitude: entity.longitude,
    location: entity.location,
    status: entity.status,
    locationCoordinate: entity.locationCoordinate,
    // user: null,
    // tour: null,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  }
  // if (entity.user) {
  //   model.user = entity.user
  // }
  // if (entity.tour) {
  //   model.tour = entity.tour
  // }

  return model
}
export const toSearchModel = entities => {
  return _.map(entities, toModel)
}

export const toNewModel = (body: ITourVisitDoc) => {
  const model = {
    latitude: body.latitude,
    longitude: body.longitude,
    location: body.location,
    locationCoordinate: body.locationCoordinate,
    user: body.userId,
    tour: body.tourId,
  }
  return model
}
