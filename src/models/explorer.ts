import { IExplorer } from 'interfaces/explorer'
import mongoose from 'mongoose'

const explorerSchema = new mongoose.Schema<IExplorer>(
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

const Explorer = mongoose.model<IExplorer>('Explorer', explorerSchema)

export default Explorer
