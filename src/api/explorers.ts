import httpStatus from 'http-status'
import * as ExplorerService from '../services/explorers'
import { Request, Response } from 'express'
import pick from '../utils/pick'
import { IOptions } from '../helpers/paginate'
import * as explorerM from '../mappers/explorer'
import { IExplorerDoc } from 'interfaces/explorer'
import * as fetch from '../providers/fetch'
import Explorer from '../models/explorer'
import { extractPage } from '../utils/paging'
export const create = async (req: Request, res: Response) => {
  try {
    const entity = await ExplorerService.create(req.body)
    res.status(httpStatus.CREATED).send({
      isSuccess: true,
      data: explorerM.toModel(entity as IExplorerDoc),
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const entity = await ExplorerService.update(req.params.id, req.body)
    res.status(httpStatus.OK).send({
      isSuccess: true,
      data: explorerM.toModel(entity as unknown as IExplorerDoc),
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const get = async (req: Request, res: Response) => {
  try {
    const entity = await ExplorerService.get(req.params.id)
    res.status(httpStatus.OK).send({
      isSuccess: true,
      data: explorerM.toModel(entity as unknown as IExplorerDoc),
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const entity: string = await ExplorerService.deleteOne(req.params.id)
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
    const result = await ExplorerService.search(filter, options)
    res.send({
      isSuccess: true,
      items: explorerM.toSearchModel(result.items),
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
    const result = await ExplorerService.list(page, req.query)
    const response = {
      isSuccess: true,
      items: explorerM.toSearchModel(result.items),
      totalRecord: result.count,
      pageNo: 1,
      limit: result.count,
    }
    if (page && page.limit) {
      response.limit = page.limit
    }
    if (page && page.pageNo) {
      response.pageNo = page.pageNo
    }

    res.send(response)
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, error: error })
  }
}

export const point = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entity: any = await fetch.get(
    'http://localhost:5050/api/POIs?lon=48.398519030472855&lat=9.99245176438499',
    {},
  )
  await Explorer.insertMany(explorerM.toCreateArrayModel(entity))
  return res.json({
    isSuccess: true,
    items: entity,
    totalRecords: entity.length,
  })
}
