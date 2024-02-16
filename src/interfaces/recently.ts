import { Model, Document, SaveOptions, Types } from 'mongoose'
import { QueryResult } from '../helpers/paginate'
import { toUserModel } from './user'
import { IExplorer } from './explorer'
import { ITour } from './tour'

// Define Recently schema
export interface IRecently {
  explorer: Types.ObjectId | IExplorer
  user: Types.ObjectId | toUserModel
  isLike: boolean
  isView: boolean
  tour: ITour
  isTourView: boolean
  isTourLike: boolean
}

export interface IRecentlyDoc extends IRecently, Document {
  id?: string
  explorerId?: string
  userId?: string
  tourId?: string
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
  tourId: string
}
