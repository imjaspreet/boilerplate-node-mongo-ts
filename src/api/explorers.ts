import httpStatus from 'http-status'
import * as ExplorerService from '../services/explorers'
import { Request, Response } from 'express'
import pick from '../utils/pick'
import { IOptions } from '../helpers/paginate'
import * as explorerM from '../mappers/explorer'
import { IExplorerDoc } from 'interfaces/explorer'
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
