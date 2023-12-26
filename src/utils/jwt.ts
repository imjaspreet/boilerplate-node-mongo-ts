import { setGlobalEnvironment } from '../global'
import * as jwt from 'jsonwebtoken'
import Environment from '../environments/environment'
const env: Environment = new Environment()
setGlobalEnvironment(env)

interface AuthConfig {
  secret: string
  tokenPeriod: number
  refreshSecret: string
  refreshPeriod: number
}

interface User {
  id: string
}

interface Session {
  id: string
}

interface Claims {
  session: string
  user: string
}

export const getAccessToken = (user: User, session: Session): string => {
  const claims: Claims = {
    session: session.id,
    user: user.id,
  }
  return jwt.sign(claims, env.secretKey, {
    expiresIn: `${env.secretPeriod}m`,
  })
}

export const getRefreshToken = (user: User): string => {
  const claims: Claims = {
    user: user.id,
    session: '',
  }
  return jwt.sign(claims, env.refreshKey, {
    expiresIn: `${env.refreshPeriod}d`,
  })
}

export const verifyAccessToken = (token: string): any => {
  return jwt.verify(token, env.secretKey)
}

export const verifyRefreshToken = (token: string): any => {
  return jwt.verify(token, env.secretKey)
}
