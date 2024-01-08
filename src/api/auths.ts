import httpStatus from 'http-status'
import { Request, Response } from 'express'
import * as AuthService from '../services/auths'
import { toModel, toAuthModel, toGuestModel } from '../mappers/user'
import { IAuthModel, toUserModel } from 'interfaces/user'
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await AuthService.register(req.body)

    res
      .status(httpStatus.CREATED)
      .send({ isSuccess: true, data: toModel(user as toUserModel) })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await AuthService.accountLogin(req.body)
    res
      .status(httpStatus.OK)
      .send({ isSuccess: true, data: toAuthModel(user as IAuthModel) })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const verify = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await AuthService.verification(req.body.userId, req.body.code)
    res.status(httpStatus.OK).send({
      isSuccess: true,
      message: user,
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const forgot = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await AuthService.forgotPassword(req.body)
    res
      .status(httpStatus.CREATED)
      .send({ isSuccess: true, data: toModel(user as unknown as toUserModel) })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const resendOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const entity = await AuthService.resendCode(req.params.id)
    res.status(httpStatus.OK).send({ isSuccess: true, message: entity })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}
export const reset = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await AuthService.resetPassword(
      req.params.id,
      req.body.password,
    )
    res.status(httpStatus.OK).send({ isSuccess: true, message: user })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const updatePassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = await AuthService.changePassword(
      req.params.id,
      req.body.password,
      req.body.newPassword,
    )
    res.status(httpStatus.OK).send({ isSuccess: true, message: user })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const socialLogin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = await AuthService.socialLoginAccount(req.body)
    res.status(httpStatus.OK).send({
      isSuccess: true,
      data: toAuthModel(user as unknown as IAuthModel),
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const message: string = await AuthService.userLogout(req.params.id)
    res.status(httpStatus.OK).send({
      isSuccess: true,
      message,
    })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}

export const guest = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await AuthService.createGuest()
    res.send({ isSuccess: true, data: toGuestModel(user) })
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ isSuccess: false, ...error })
  }
}
