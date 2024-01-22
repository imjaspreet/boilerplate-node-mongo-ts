import { IRecentlyDoc } from 'interfaces/recently'
import { IExplorerDoc } from 'interfaces/explorer'
import { toUserModel } from 'interfaces/user'
import * as UserM from './user'
import * as ExplorerM from './explorer'
import _ from 'underscore'

export const toModel = (entity: IRecentlyDoc) => {
  const model = {
    id: entity._id,
    explorer: null,
    user: null,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  }

  if (entity.user) {
    model.user = UserM.toModel(entity.user as toUserModel)
  }

  if (entity.explorer) {
    model.explorer = ExplorerM.toModel(entity.explorer as IExplorerDoc)
  }

  return model
}
export const toSearchModel = (entities: [IRecentlyDoc]) => {
  return _.map(entities, toModel)
}
