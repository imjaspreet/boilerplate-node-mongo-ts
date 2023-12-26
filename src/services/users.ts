import httpStatus from 'http-status';
import User from '../models/user';
import ApiError from '../utils/error/ApiError';
import { NewCreatedUser, IUserDoc } from '../interfaces/user';

/**
 * Create a user
 * @param {NewCreatedUser} userBody
 * @returns {Promise<IUserDoc>}
 */
export const createUser = async (userBody: NewCreatedUser): Promise<IUserDoc> => {
    if (await User.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return User.create(userBody);
  };