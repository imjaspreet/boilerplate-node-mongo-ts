import { ITourVisitDoc } from '../interfaces/tourVisit'
import httpStatus from 'http-status'
import * as TourVisitService from '../services/tourVisits'
import { Request, Response } from 'express'
import pick from '../utils/pick'
import { IOptions } from '../helpers/paginate'
import * as tourVisitM from '../mappers/tourVisit'

export const create = async (req: Request, res: Response) => {
  try {
    const entity = await TourVisitService.create(req.body)
    res.status(httpStatus.CREATED).send({
      isSuccess: true,
      data: tourVisitM.toModel(entity as ITourVisitDoc),
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const entity = await TourVisitService.update(req.params.id, req.body)
    res.status(httpStatus.OK).send({
      isSuccess: true,
      data: tourVisitM.toModel(entity as unknown as ITourVisitDoc),
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const get = async (req: Request, res: Response) => {
  try {
    const entity = await TourVisitService.get(req.params.id)
    res.status(httpStatus.OK).send({
      isSuccess: true,
      data: tourVisitM.toModel(entity as unknown as ITourVisitDoc),
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const entity: string = await TourVisitService.deleteOne(req.params.id)
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
    const result = await TourVisitService.search(filter, options)
    res.send({
      isSuccess: true,
      items: tourVisitM.toSearchModel(result.items),
      totalRecord: result.totalResults,
      PageNo: result.page,
      limit: options.limit,
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}
