import { IRecentlyModel, IRecentlyDoc, IRecently } from 'interfaces/recently'
import mongoose from 'mongoose'
import paginate from '../helpers/paginate'
import toJSON from '../helpers/toJSON'

const recentlySchema = new mongoose.Schema<IRecentlyDoc, IRecentlyModel>(
  {
    explorer: { type: mongoose.Schema.Types.ObjectId, ref: 'explorer' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
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
)

export default Explorer
