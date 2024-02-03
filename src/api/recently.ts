import httpStatus from 'http-status'
import * as RecentlyService from '../services/recently'
import { Request, Response } from 'express'
import pick from '../utils/pick'
import { IOptions } from '../helpers/paginate'
import * as recentlyM from '../mappers/recently'
import { IRecentlyDoc } from 'interfaces/recently'

export const create = async (req: Request, res: Response) => {
  try {
    const entity = await RecentlyService.create(req.body)
    res.status(httpStatus.CREATED).send({
      isSuccess: true,
      data: recentlyM.toModel(entity as IRecentlyDoc),
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const entity = await RecentlyService.update(req.params.id, req.body)
    res.status(httpStatus.OK).send({
      isSuccess: true,
      data: recentlyM.toModel(entity as unknown as IRecentlyDoc),
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const get = async (req: Request, res: Response) => {
  try {
    const entity = await RecentlyService.get(req.params.id)
    res.status(httpStatus.OK).send({
      isSuccess: true,
      data: recentlyM.toModel(entity as unknown as IRecentlyDoc),
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, error: error })
  }
}

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const entity: string = await RecentlyService.deleteOne(req.params.id)
    res.status(httpStatus.OK).send({ isSuccess: true, message: entity })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, error: error })
  }
}

export const search = async (req: Request, res: Response) => {
  try {
    const filter = pick(req.query, ['user', 'isView', 'isLike'])
    const options: IOptions = pick(req.query, [
      'sortBy',
      'limit',
      'page',
      'projectBy',
    ])
    options.populate = 'explorer,user'
    const result = await RecentlyService.search(filter, options)
    res.send({
      isSuccess: true,
      items: recentlyM.toSearchModel(result.items as [IRecentlyDoc]),
      totalRecord: result.totalResults,
      PageNo: result.page,
      limit: options.limit,
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, error: error })
  }
}

export const markFavorite = async (req: Request, res: Response) => {
  try {
    const entity = await RecentlyService.favorite(req.body)
    res.status(httpStatus.CREATED).send({
      isSuccess: true,
      data: recentlyM.toModel(entity as IRecentlyDoc),
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, error: error })
  }
}
