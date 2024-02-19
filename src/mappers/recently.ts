import { IRecentlyDoc } from 'interfaces/recently'
import { IExplorerDoc } from 'interfaces/explorer'
import { toUserModel } from 'interfaces/user'
import * as UserM from './user'
import * as ExplorerM from './explorer'
import _ from 'underscore'
import { ITourDoc } from 'interfaces/tour'
import * as TourM from './tour'
export const toModel = (entity: IRecentlyDoc) => {
  const model = {
    id: entity._id,
    explorer: null,
    user: null,
    tour: null,
    isLike: entity.isLike,
    isView: entity.isView,
    isTourView: entity.isTourView,
    isTourLike: entity.isTourLike,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  }

  if (entity.user) {
    model.user = UserM.toSmallModel(entity.user as toUserModel)
  }

  if (entity.explorer) {
    model.explorer = ExplorerM.toModel(entity.explorer as IExplorerDoc)
  }
  if (entity.tour) {
    model.tour = TourM.toModel(entity.tour as ITourDoc)
  }

  return model
}
export const toSearchModel = (entities: [IRecentlyDoc]) => {
  return _.map(entities, toModel)
}

export const toViewModel = (body: IRecentlyDoc) => {
  const model = {
    explorer: body.explorerId,
    user: body.userId,
    isView: body.explorerId && true,
    tour: body.tourId,
    isTourView: body.tourId && true,
  }
  return model
}
export const toFavouriteModel = (body: IRecentlyDoc) => {
  const model = {
    explorer: body.explorerId,
    user: body.userId,
    isLike: body.explorerId && true,
    tour: body.tourId,
    isTourLike: body.tourId && true,
  }
  return model
}
