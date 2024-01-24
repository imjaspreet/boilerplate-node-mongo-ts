import Joi from 'joi'
import { createLanguage } from '../interfaces/language'
import { objectId } from './custom.validation'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createModel: Record<keyof createLanguage, any> = {
  name: Joi.string().required(),
  shortName: Joi.string().required(),
  json: Joi.object(),
}

export const createData = {
  body: Joi.object().keys(createModel),
}

export const search = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
}

export const get = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
}

export const update = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    shortName: Joi.string().required(),
    json: Joi.object(),
  }),
}

export const deleteOne = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
}
