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
    state: String,
    postalCode: String,
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
explorerSchema.pre('save', async function (next) {
  if (this.isModified('latitude') && this.isModified('latitude')) {
    this.location = {
      type: 'Point',
      coordinates: [this.longitude, this.latitude],
    }
  }
  next()
})
const Explorer = mongoose.model<IExplorer, IExplorerModel>(
  'Explorer',
  explorerSchema,
)

export default Explorer
