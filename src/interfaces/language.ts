import { Model, Document, SaveOptions } from 'mongoose'
import { QueryResult } from '../helpers/paginate'

export interface ILanguage {
  name: string
  shortName: string
  json: object
}

export interface ILanguageDoc extends ILanguage, Document {
  id?: string
  createdAt?: string
  updatedAt?: string
}

export interface ILanguageModel extends Model<ILanguageDoc> {
  save(): SaveOptions
  paginate(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filter: Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: Record<string, any>,
  ): Promise<QueryResult>
}

export interface createLanguage extends ILanguage {}
