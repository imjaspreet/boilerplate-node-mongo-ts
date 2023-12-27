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
  try {
    const user = await register(req.body)

    res.status(httpStatus.CREATED).send({ isSuccess: true, data: user })
  } catch (error) {
    res.send({ isSuccess: false, error })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await accountLogin(req.body)
    res.status(httpStatus.OK).send({ isSuccess: true, data: user })
  } catch (error) {
    res.send({ isSuccess: false, error })
  }
}

export const verify = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await verification(req.body.userId, req.body.code)
    res.status(httpStatus.OK).send({ isSuccess: true, data: user })
  } catch (error) {
    res.send({ isSuccess: false, error })
  }
}

export const forgot = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await forgotPassword(req.body)
    res.status(httpStatus.OK).send({ isSuccess: true, data: user })
  } catch (error) {
    res.send({ isSuccess: false, error })
  }
}

export const resendOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const entity = await resendCode(req.params.id)
    res.status(httpStatus.OK).send({ isSuccess: true, message: entity })
  } catch (error) {
    res.send({ isSuccess: false, error })
  }
}
export const reset = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await resetPassword(req.params.id, req.body.password)
    res.status(httpStatus.OK).send({ isSuccess: true, message: user })
  } catch (error) {
    res.send({ isSuccess: false, error })
  }
}

export const updatePassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = await changePassword(
      req.params.id,
      req.body.password,
      req.body.newPassword,
    )
    res.status(httpStatus.OK).send({ isSuccess: true, message: user })
  } catch (error) {
    res.send({ isSuccess: false, error })
  }
}
