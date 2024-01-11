import { IExplorerDoc } from 'interfaces/explorer'
import _ from 'underscore'
export const toModel = (entity: IExplorerDoc) => {
  const model = {
    id: entity._id,
    name: entity.name,
    city: entity.city,
    country: entity.country,
    importance: entity.importance,
    latitude: entity.latitude,
    longitude: entity.longitude,
    additionalSources: entity.additionalSources,
    categories: entity.categories && _.uniq(entity.categories),
    properties: entity.properties,
    distance: entity.distance,
    foreignSources: entity.foreignSources,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  }
  return model
}
export const toSearchModel = entities => {
  return _.map(entities, toModel)
}

export const toNewModel = (entity: IExplorerDoc) => {
  const model = {
    id: entity._id,
    name: entity.name,
    city: entity.city,
    country: entity.country,
    importance: entity.importance,
    latitude: entity.latitude,
    longitude: entity.longitude,
    additionalSources: entity.additional_sources,
    categories: entity.categories && _.uniq(entity.categories),
    location: {
      type: 'Point',
      coordinates: [entity.longitude, entity.latitude],
    },
    properties: entity.properties,
    distance: entity.distance,
    foreignSources: entity.foreign_sources,
  }
  return model
}
export const toCreateArrayModel = entities => {
  return _.map(entities, toNewModel)
}
