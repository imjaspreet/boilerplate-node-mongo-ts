import httpStatus from 'http-status'
import * as LanguageService from '../services/languages'
import { Request, Response } from 'express'
import pick from '../utils/pick'
import { IOptions } from '../helpers/paginate'
import * as LanguageMapper from '../mappers/language'
import { ILanguageDoc } from 'interfaces/language'

export const create = async (req: Request, res: Response) => {
  try {
    const entity = await LanguageService.create(req.body)
    res.status(httpStatus.CREATED).send({
      isSuccess: true,
      data: LanguageMapper.toModel(entity as ILanguageDoc),
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const entity = await LanguageService.update(req.params.id, req.body)
    res.status(httpStatus.OK).send({
      isSuccess: true,
      data: LanguageMapper.toModel(entity as unknown as ILanguageDoc),
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const get = async (req: Request, res: Response) => {
  try {
    const entity = await LanguageService.get(req.params.id)
    res.status(httpStatus.OK).send({
      isSuccess: true,
      data: LanguageMapper.toModel(entity as unknown as ILanguageDoc),
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const entity: string = await LanguageService.deleteOne(req.params.id)
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
    const result = await LanguageService.search(filter, options)
    res.send({
      isSuccess: true,
      items: LanguageMapper.toSearchModel(result.items as [ILanguageDoc]),
      totalRecord: result.totalResults,
      PageNo: result.page,
      limit: options.limit,
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}