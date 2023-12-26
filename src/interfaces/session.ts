import { IUserModel } from './user';

export interface ISession {
      id: string;
      deviceId: string;
      deviceType: string;
      accessToken: string;
      refreshToken: string;
      fcmToken: string;
      accessTokenExpires: string;
      refreshTokenExpires: string;
      user: IUserModel;
}
