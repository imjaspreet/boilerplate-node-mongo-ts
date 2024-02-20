import { IRecentlyModel, IRecentlyDoc, IRecently } from '../interfaces/recently'
import mongoose from 'mongoose'
import paginate from '../helpers/paginate'
import toJSON from '../helpers/toJSON'

const recentlySchema = new mongoose.Schema<IRecentlyDoc, IRecentlyModel>(
  {
    explorer: { type: mongoose.Schema.Types.ObjectId, ref: 'Explorer' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isLike: { type: Boolean, default: false },
    isView: { type: Boolean, default: false },
    tour: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' },
    isTourView: Boolean,
    isTourLike: Boolean,
  },
  {
    timestamps: true,
  },
)

recentlySchema.plugin(toJSON)
recentlySchema.plugin(paginate)

const Explorer = mongoose.model<IRecently, IRecentlyModel>(
  'Recently',
  recentlySchema,
  'recently',
)

export default Explorer
