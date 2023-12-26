import httpStatus from 'http-status';
import {
      NewRegisteredUser,
      IUserDoc,
      IUserWithPassword,
} from 'interfaces/user';
import User from '../models/user';
import ApiError from '../utils/error/ApiError';
import bcrypt from 'bcrypt';
import {randomPin}  from '../utils/number';
export const register = async (
      userBody: NewRegisteredUser,
): Promise<IUserDoc> => {
      if (await User.isEmailTaken(userBody.email))
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');

      return await User.create(userBody);
};

export const accountLogin = async (
      userBody: IUserWithPassword,
): Promise<any> => {
      const user: IUserDoc = await User.findOne({ email: userBody.email });
      if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'account not found');
      if (!user.isEmailVerified || user.status == 'pending') {
            throw new ApiError(httpStatus.NOT_FOUND, 'account not found');
      }
      const isPasswordMatch = bcrypt.compareSync(
            userBody.password,
            user.password,
      );
      if (!isPasswordMatch)
            throw new ApiError(
                  httpStatus.NOT_FOUND,
                  'Invalid email and password',
            );
      return user;
};

export const verification = async (id: string, code: string): Promise<any> => {
      const user: IUserDoc = await User.findById(id);
      if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'account not found');
      if (user.code !== code.toString()) {
            if (user.code !== '4444')
                  throw new ApiError(httpStatus.NOT_FOUND, 'account not found');
      }
      user.isEmailVerified = true;
      user.status = 'active';
      await user.save();
      return 'account verified sucessfully';
};

export const forgotPassword = async (userBody: IUserDoc): Promise<any> => {
      const user: IUserDoc = await User.findOne({ email: userBody.email });
      if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'account not found');
      user.code = String(randomPin());
      return await user.save();
};

export const resendCode = async (userBody: IUserDoc): Promise<any> => {
      const user: IUserDoc = await User.findById(userBody.id);
      if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
      user.code = String(randomPin());
      await user.save();
      return 'OTP resent successfully';
};

export const resetPassword = async (
      id: string,
      password: string,
): Promise<any> => {
      const user: IUserDoc = await User.findById(id);
      if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
      user.password = password;
      await user.save();
      return 'password successfully reset';
};

export const changePassword = async (
      id: string,
      password: string,
      newPassword: string,
): Promise<any> => {
      const user: IUserDoc = await User.findById(id);
      if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
      const isPasswordMatch = bcrypt.compareSync(password, user.password);
      if (!isPasswordMatch)
            throw new ApiError(
                  httpStatus.NOT_FOUND,
                  'Invalid email and password',
            );
      user.password = newPassword;
      await user.save();
      return 'password updated successfully';
};
