import Joi from 'joi'
import { createExplorer } from '../interfaces/explorer'
import { objectId } from './custom.validation'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createModel: Record<keyof createExplorer, any> = {
  name: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  importance: Joi.number(),
  additionalSources: Joi.array(),
  categories: Joi.array(),
  properties: Joi.array(),
  foreignSources: Joi.array(),
  location: Joi.object(),
  state: Joi.string(),
  postalCode: Joi.string(),
  tour: Joi.string(),
}

export const createData = {
  body: Joi.object().keys(createModel),
}

export const search = {
  query: Joi.object().keys({
    name: Joi.string(),
    city: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
}

export const list = {
  query: Joi.object().keys({
    name: Joi.string(),
    search: Joi.string(),
    city: Joi.string(),
    lat: Joi.number(),
    long: Joi.number(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    skip: Joi.number(),
    userId: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    pageNo: Joi.number().integer(),
    serverPaging: Joi.bool().default(true),
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
  body: Joi.object()
    .keys({
      name: Joi.string(),
      latitude: Joi.number(),
      longitude: Joi.number(),
      city: Joi.string(),
      country: Joi.string(),
      importance: Joi.number(),
      additionalSources: Joi.array(),
      categories: Joi.array(),
      properties: Joi.array(),
      foreignSources: Joi.array(),
    })
    .min(1),
}

export const deleteOne = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
}
