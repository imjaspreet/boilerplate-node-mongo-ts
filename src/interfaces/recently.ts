import { Model, Document, SaveOptions } from 'mongoose'
import { QueryResult } from '../helpers/paginate'
import { toUserModel } from './user'
import { IExplorer } from './explorer'
export interface IRecently {
  explorer: IExplorer
  user: toUserModel
  time: Date
  isView: boolean
  isLike: boolean
}

export interface IRecentlyDoc extends IRecently, Document {
  id?: string
  explorerId?: string
  userId?: string
  createdAt?: string
  updatedAt?: string
}

export interface IRecentlyModel extends Model<IRecentlyDoc> {
  save(): SaveOptions
  paginate(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filter: Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: Record<string, any>,
  ): Promise<QueryResult>
}

export interface createRecently {
  explorerId: string
  userId: string
}
