import httpStatus from 'http-status'
import * as userService from '../services/users'
import { Request, Response } from 'express'
import pick from '../utils/pick'
import { IOptions } from '../helpers/paginate'

export const create = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body)
  res.status(httpStatus.CREATED).send(user)
}

export const update = async (req: Request, res: Response) => {
  const user = await userService.updateUser(req.params.id, req.body)
  res.status(httpStatus.OK).send(user)
}

export const get = async (req: Request, res: Response) => {
  const user = await userService.updateUser(req.params.id, req.body)
  res.status(httpStatus.OK).send(user)
}

export const remove = async (req: Request, res: Response) => {
  const user = await userService.updateUser(req.params.id, req.body)
  res.status(httpStatus.OK).send(user)
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
  res.send(result)
}
