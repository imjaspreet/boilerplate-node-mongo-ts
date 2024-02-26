import { ITourVisitModel, ITourVisitDoc } from '../interfaces/tourVisit'
import mongoose from 'mongoose'
import paginate from '../helpers/paginate'
import toJSON from '../helpers/toJSON'
const tourVisitSchema = new mongoose.Schema<ITourVisitDoc, ITourVisitModel>(
  {
    latitude: Number,
    longitude: Number,
    status: { Type: String, enum: ['start', 'close'], default: 'start' },
    locationCoordinate: [{ latitude: Number, longitude: Number }],
    tour: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
)

// tourVisitSchema.index({ location: '2dsphere' })
tourVisitSchema.plugin(toJSON)
tourVisitSchema.plugin(paginate)

const TourVisit = mongoose.model<ITourVisitDoc, ITourVisitModel>(
  'TourVisit',
  tourVisitSchema,
)

export default TourVisit
