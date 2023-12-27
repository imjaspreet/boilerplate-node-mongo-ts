import httpStatus from 'http-status'
import { Request, Response } from 'express'
import {
  register,
  accountLogin,
  verification,
  forgotPassword,
  resetPassword,
  resendCode,
  changePassword,
} from '../services/auths'
export const signup = async (req: Request, res: Response): Promise<void> => {
  const user = await register(req.body)

  res.status(httpStatus.CREATED).send({ isSuccess: true, data: user })
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const user = await accountLogin(req.body)
  res.status(httpStatus.OK).send({ isSuccess: true, data: user })
}

export const verify = async (req: Request, res: Response): Promise<void> => {
  const user = await verification(req.body.id, req.body.code)
  res.status(httpStatus.OK).send({ isSuccess: true, data: user })
}

export const forgot = async (req: Request, res: Response): Promise<void> => {
  const user = await forgotPassword(req.body)
  res.status(httpStatus.OK).send({ isSuccess: true, data: user })
}

export const resendOtp = async (req: Request, res: Response): Promise<void> => {
  const entity = await resendCode(req.body)
  res.status(httpStatus.OK).send({ isSuccess: true, message: entity })
}
export const reset = async (req: Request, res: Response): Promise<void> => {
  const user = await resetPassword(req.params.id, req.body.password)
  res.status(httpStatus.OK).send({ isSuccess: true, message: user })
}

export const updatePassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const user = await changePassword(
    req.params.id,
    req.body.password,
    req.body.newPassword,
  )
  res.status(httpStatus.OK).send({ isSuccess: true, message: user })
}
