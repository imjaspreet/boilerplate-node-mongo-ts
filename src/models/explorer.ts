import { IExplorerModel, IExplorerDoc, IExplorer } from 'interfaces/explorer'
import mongoose from 'mongoose'
import paginate from '../helpers/paginate'
import toJSON from '../helpers/toJSON'
const explorerSchema = new mongoose.Schema<IExplorerDoc, IExplorerModel>(
  {
    latitude: Number,
    longitude: Number,
    location: {
      type: { type: String, enum: ['Point'] },
      coordinates: { type: [Number] },
    },
    name: String,
    city: String,
    country: String,
    importance: Number,
    additionalSources: [{}],
    categories: [],
    properties: [],
    foreignSources: [],
  },
  {
    timestamps: true,
  },
)

explorerSchema.index({ location: '2dsphere' })
explorerSchema.plugin(toJSON)
explorerSchema.plugin(paginate)
const Explorer = mongoose.model<IExplorer, IExplorerModel>(
  'Explorer',
  explorerSchema,
)

export default Explorer
