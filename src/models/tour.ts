import { ITour, ITourDoc, ITourModel } from 'interfaces/tour'
import mongoose from 'mongoose'
import paginate from '../helpers/paginate'
import toJSON from '../helpers/toJSON'
const tourSchema = new mongoose.Schema<ITourDoc, ITourModel>(
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
    title: String,
    description: String,
    shortDescription: String,
    explorers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Explorer' }],
  },
  {
    timestamps: true,
  },
)

tourSchema.index({ location: '2dsphere' })
tourSchema.plugin(toJSON)
tourSchema.plugin(paginate)
tourSchema.pre('save', async function (next) {
  if (this.isModified('latitude') && this.isModified('latitude')) {
    this.location = {
      type: 'Point',
      coordinates: [this.longitude, this.latitude],
    }
  }
  next()
})
const Tour = mongoose.model<ITour, ITourModel>('Tour', tourSchema)

export default Tour
