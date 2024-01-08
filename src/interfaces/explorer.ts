import { Model, Document, SaveOptions } from 'mongoose'
import { QueryResult } from '../helpers/paginate'
export interface IExplorer {
  latitude: number
  longitude: number
  name: string
  location: object
  city: string
  country: string
  importance: number
  additionalSources: Array<object>
  categories: Array<string>
  properties: Array<string>
  foreignSources: Array<object>
}

export interface IExplorerDoc extends IExplorer, Document {
  createdAt?: string
  updatedAt?: string
}

export interface IExplorerModel extends Model<IExplorerDoc> {
  save(): SaveOptions
  paginate(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filter: Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: Record<string, any>,
  ): Promise<QueryResult>
}

export interface createExplorer extends IExplorerModel {}
