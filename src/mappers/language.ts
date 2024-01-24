import { ILanguageDoc } from './../interfaces/language'
import _ from 'underscore'

export const toModel = (entity: ILanguageDoc) => {
  const model = {
    id: entity._id,
    name: entity.name,
    shortName: entity.shortName,
    json: entity.json,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  }

  return model
}
export const toSearchModel = (entities: [ILanguageDoc]) => {
  return _.map(entities, toModel)
}
