import { password } from './../validators/custom.validation'
import mongoose, { Model, Document } from 'mongoose'

export interface IUser {
  name: string
  email: string
  password: string
  role: string
  isEmailVerified: boolean
  authMethod: string
  language: string
  status: string
  code: string
}

export interface IUserDoc extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>
}

export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(
    email: string,
    excludeUserId?: mongoose.Types.ObjectId,
  ): Promise<boolean>
}

export type UpdateUserBody = Partial<IUser>

export type NewRegisteredUser = Omit<IUser, 'role' | 'isEmailVerified'>

export type NewCreatedUser = Omit<IUser, 'isEmailVerified'>

export interface IUserWithTokens {
  user: IUserDoc
  accessToken: String
}

export interface IUserWithPassword extends IUser {
  password: string
}
