import {
  ILanguage,
  ILanguageDoc,
  ILanguageModel,
} from './../interfaces/language'
import mongoose from 'mongoose'
import paginate from '../helpers/paginate'
import toJSON from '../helpers/toJSON'

const languageSchema = new mongoose.Schema<ILanguageDoc, ILanguageModel>(
  {
    name: { type: String, trim: true },
    shortName: { type: String, lowercase: true },
    json: {},
  },
  {
    timestamps: true,
  },
)

languageSchema.plugin(toJSON)
languageSchema.plugin(paginate)

const Language = mongoose.model<ILanguage, ILanguageModel>(
  'Language',
  languageSchema,
)

export default Language
