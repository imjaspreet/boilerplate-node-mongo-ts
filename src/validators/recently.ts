import Joi from 'joi'
import { createRecently } from '../interfaces/recently'
import { objectId } from './custom.validation'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createModel: Record<keyof createRecently, any> = {
  userId: Joi.string(),
  explorerId: Joi.string(),
  tourId: Joi.string(),
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
    isView: Joi.bool(),
    isLike: Joi.bool(),
    userId: Joi.string(),
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
      user: Joi.string(),
      explorer: Joi.string(),
    })
    .min(1),
}

export const deleteOne = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
}
