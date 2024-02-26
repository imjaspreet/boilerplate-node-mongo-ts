import { Model, Document, SaveOptions, Types } from 'mongoose'
import { QueryResult } from '../helpers/paginate'
import { ITourDoc } from './tour'
import { IUserDoc } from './user'
export interface ITourVisit {
  latitude: number
  longitude: number
  location?: object
  locationCoordinate: object[]
  user: Types.ObjectId | IUserDoc
  tour: Types.ObjectId | ITourDoc
}

export interface ITourVisitDoc extends ITourVisit, Document {
  userId?: string
  tourId?: string
  distance?: number
  createdAt?: string
  updatedAt?: string
}

export interface ITourVisitModel extends Model<ITourVisitDoc> {
  save(): SaveOptions
  paginate(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filter: Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: Record<string, any>,
  ): Promise<QueryResult>
}

export interface createTourVisit extends ITourVisit {}
export interface TourVisitCreate extends ITourVisit {
  tourId: string
  userId: string
  save(): SaveOptions
}
