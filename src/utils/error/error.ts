/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import httpStatus from 'http-status'
// import config from '../../config/config';
// import { logger } from '../logger';
import ApiError from './ApiError'

export const errorConverter = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR
    const message: string = error.message || `${httpStatus[statusCode]}`
    error = new ApiError(statusCode, message, false, err.stack)
  }
  next(error)
}

// eslint-disable-next-line no-unused-vars
export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let { statusCode, message } = err
  if (
    global.environment.getCurrentEnvironment() === 'production' &&
    !err.isOperational
  ) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = 'Internal Server Error'
  }

  res.locals['errorMessage'] = err.message

  const response = {
    isSuccess: false,
    code: statusCode,
    message,
    ...(global.environment.getCurrentEnvironment() === 'dev' && {
      stack: err.stack,
    }),
  }

  if (global.environment.getCurrentEnvironment() === 'dev') {
    // logger.error(err);
  }

  res.status(statusCode).send(response)
}
