import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { IUserDoc, IUserModel } from './../interfaces/user'

const userSchema = new mongoose.Schema<IUserDoc, IUserModel>(
  {
    authMethod: String,
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            'Password must contain at least one letter and one number',
          )
        }
      },
      private: true, // used by the toJSON plugin
    },
    language: String,
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    code: String,
    status: {
      type: String,
      enum: ['active', 'blocked', 'inactive', 'deleted'],
    },
  },
  {
    timestamps: true,
  },
)

// // add plugin that converts mongoose to json
// userSchema.plugin(toJSON);
// userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.static(
  'isEmailTaken',
  async function (
    email: string,
    excludeUserId: mongoose.ObjectId,
  ): Promise<boolean> {
    const user = await this.findOne({
      email,
      _id: { $ne: excludeUserId },
    })
    return !!user
  },
)

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10)
  }
  next()
})

const User = mongoose.model<IUserDoc, IUserModel>('User', userSchema)

export default User
