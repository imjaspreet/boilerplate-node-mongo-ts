import httpStatus from 'http-status'
import * as userService from '../services/users'
import { Request, Response } from 'express'
import pick from '../utils/pick'
import { IOptions } from '../helpers/paginate'
import { toModel, toSearchModel } from '../mappers/user'
import { toUserModel } from 'interfaces/user'
export const create = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body)
  res
    .status(httpStatus.CREATED)
    .send({ isSuccess: true, data: toModel(user as toUserModel) })
}

export const update = async (req: Request, res: Response) => {
  const user = await userService.updateUser(req.params.id, req.body)
  res
    .status(httpStatus.OK)
    .send({ isSuccess: true, data: toModel(user as toUserModel) })
}

export const get = async (req: Request, res: Response) => {
  const user = await userService.updateUser(req.params.id, req.body)
  res
    .status(httpStatus.OK)
    .send({ isSuccess: true, data: toModel(user as toUserModel) })
}

export const remove = async (req: Request, res: Response) => {
  const user = await userService.updateUser(req.params.id, req.body)
  res
    .status(httpStatus.OK)
    .send({ isSuccess: true, data: toModel(user as toUserModel) })
}

export const search = async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name'])
  const options: IOptions = pick(req.query, [
    'sortBy',
    'limit',
    'page',
    'projectBy',
  ])
  const result = await userService.search(filter, options)
  res.send({
    isSuccess: true,
    items: toSearchModel(result.items),
    totalRecord: result.totalResults,
    PageNo: result.page,
  })
}
