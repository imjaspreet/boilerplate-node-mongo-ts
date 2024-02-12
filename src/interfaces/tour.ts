import { Model, Document, SaveOptions } from 'mongoose'
import { QueryResult } from '../helpers/paginate'
export interface ITour {
  name: string
  latitude: number
  longitude: number
  location?: object
  city: string
  state: string
  postalCode: string
  country: string
  importance: number
  additionalSources: Array<object>
  categories: Array<string>
  properties: Array<string>
  foreignSources: Array<object>
}

export interface ITourDoc extends ITour, Document {
  foreign_sources?: Array<object>
  additional_sources?: Array<object>
  title?: string
  shortDescription?: string
  isFavourite?: boolean
  description?: string
  distance?: number
  createdAt?: string
  updatedAt?: string
}

export interface ITourModel extends Model<ITourDoc> {
  save(): SaveOptions
  paginate(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filter: Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: Record<string, any>,
  ): Promise<QueryResult>
}

export interface createTour extends ITour {}

export interface TextService {
  name: string
  city: string
  country: string
  latitude: number
  longitude: number
  importance: number
}
