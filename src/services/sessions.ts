import { ISession, ISessionModel } from './../interfaces/session'
import { setGlobalEnvironment } from '../global'
import * as jwt from '../utils/jwt'
import moment from 'moment'
import { IUserDoc } from '../interfaces/user'
import Session from '../models/session'
import Environment from '../environments/environment'
const env: Environment = new Environment()
setGlobalEnvironment(env)

interface userModel {
  deviceId: string
  deviceType: string
  fcmToken: string
}

const createSession = async (
  user: IUserDoc['id'],
  body: userModel,
): Promise<ISession> => {
  const model: ISessionModel = {
    user: user.id,
    fcmToken: body.fcmToken || body.deviceId,
    deviceId: body.deviceId,
    deviceType: body.deviceType,
  }

  //   if (sessionType == 'single') {
  //         await expireSessions(user.id);
  //   }
  const entity = await Session.create(model)
  entity.accessToken = jwt.getAccessToken(user, entity as ISession)
  entity.refreshToken = jwt.getRefreshToken(user)

  entity.accessTokenExpires = `${moment().add(env.secretPeriod, 'minutes')}`
  entity.refreshTokenExpires = `${moment().add(env.refreshPeriod, 'days')}`

  return (await entity.save()) as ISession
}

const expireSessions = async (userId: IUserDoc['_id']) => {
  await Session.updateMany({ user: userId }, { status: 'expired' })
}

const get = async (id: string) => {
  return await Session.findById(id)
}

export { createSession, expireSessions, get }
