import { IExplorerDoc } from '../interfaces/explorer'
import _ from 'underscore'
export const toModel = (entity: IExplorerDoc) => {
  const model = {
    id: entity._id,
    name: entity.name,
    city: entity.city,
    title: entity.title,
    description: entity.description,
    shortDescription: entity.shortDescription,
    country: entity.country,
    importance: entity.importance,
    latitude: entity.latitude,
    longitude: entity.longitude,
    additionalSources: entity.additionalSources,
    categories: entity.categories && _.uniq(entity.categories),
    properties: entity.properties,
    distance: entity.distance,
    duration: entity.duration,
    audioFile: entity.audioFile,
    foreignSources: entity.foreignSources,
    isFavourite: entity.isFavourite || false,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  }
  return model
}
export const toSearchModel = entities => {
  return _.map(entities, toModel)
}

export const toNewModel = (body: IExplorerDoc) => {
  const model = {
    id: body._id,
    name: body.name,
    city: body.city,
    country: body.country,
    importance: body.importance,
    latitude: body.latitude,
    longitude: body.longitude,
    title: body.title,
    description: body.description,
    shortDescription: body.shortDescription,
    additionalSources: body.additional_sources,
    categories: body.categories && _.uniq(body.categories),
    location: {
      type: 'Point',
      coordinates: [body.longitude, body.latitude],
    },
    properties: body.properties,
    distance: body.distance,
    foreignSources: body.foreign_sources,
  }
  return model
}
export const toCreateArrayModel = entities => {
  return _.map(entities, toNewModel)
}
