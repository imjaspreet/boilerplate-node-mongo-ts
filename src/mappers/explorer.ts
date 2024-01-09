import { IExplorerDoc } from 'interfaces/explorer'
import _ from 'underscore'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toModel = (entity: IExplorerDoc): any => {
  const model = {
    id: entity._id,
    name: entity.name,
    city: entity.city,
    country: entity.country,
    importance: entity.importance,
    latitude: entity.latitude,
    longitude: entity.longitude,
    additionalSources: entity.additionalSources,
    categories: entity.categories,
    properties: entity.properties,
    foreignSources: entity.foreignSources,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  }
  return model
}
export const toSearchModel = entities => {
  return _.map(entities, toModel)
}
