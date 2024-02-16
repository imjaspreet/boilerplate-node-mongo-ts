import { ITourDoc } from './../interfaces/tour'
import httpStatus from 'http-status'
import * as TourService from '../services/tours'
import { Request, Response } from 'express'
import pick from '../utils/pick'
import { IOptions } from '../helpers/paginate'
import * as tourM from '../mappers/tour'
import { extractPage } from '../utils/paging'

export const create = async (req: Request, res: Response) => {
  try {
    const entity = await TourService.create(req.body)
    res.status(httpStatus.CREATED).send({
      isSuccess: true,
      data: tourM.toModel(entity as ITourDoc),
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const entity = await TourService.update(req.params.id, req.body)
    res.status(httpStatus.OK).send({
      isSuccess: true,
      data: tourM.toModel(entity as unknown as ITourDoc),
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const get = async (req: Request, res: Response) => {
  try {
    const entity = await TourService.get(req.params.id)
    res.status(httpStatus.OK).send({
      isSuccess: true,
      data: tourM.toModel(entity as unknown as ITourDoc),
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const entity: string = await TourService.deleteOne(req.params.id)
    res.status(httpStatus.OK).send({ isSuccess: true, message: entity })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const search = async (req: Request, res: Response) => {
  try {
    if (req.query.userId) {
      req.query.user = req.query.userId
    }
    const filter = pick(req.query, ['name'])
    const options: IOptions = pick(req.query, [
      'sortBy',
      'limit',
      'page',
      'projectBy',
    ])
    const result = await TourService.search(filter, options)
    res.send({
      isSuccess: true,
      items: tourM.toSearchModel(result.items),
      totalRecord: result.totalResults,
      PageNo: result.page,
      limit: options.limit,
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const list = async (req: Request, res: Response) => {
  try {
    if (req.query.userId) {
      req.query.user = req.query.userId
    }
    // const options: IOptions = pick(req.query, [
    //   'sortBy',
    //   'limit',
    //   'page',
    //   'skip',
    //   'projectBy',
    //   'search',
    // ])
    const page = extractPage(req)
    const result = await TourService.list(page, req.query)
    const response = {
      isSuccess: true,
      items: tourM.toSearchModel(result.items),
      totalRecord: result.count,
      pageNo: page?.pageNo || 1,
      limit: page?.limit || result.count,
    }

    res.send(response)
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, error: error })
  }
}
