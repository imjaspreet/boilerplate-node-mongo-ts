import Joi from 'joi'
import { createTourVisit } from '../interfaces/tourVisit'
import { objectId } from './custom.validation'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createModel: Record<keyof createTourVisit, any> = {
  latitude: Joi.number(),
  longitude: Joi.number(),
  location: Joi.object(),
  locationCoordinate: Joi.array(),
  tour: Joi.string(),
  user: Joi.string(),
}

export const createData = {
  body: Joi.object().keys(createModel),
}

export const search = {
  query: Joi.object().keys({
    tourId: Joi.string(),
    userId: Joi.string(),
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
