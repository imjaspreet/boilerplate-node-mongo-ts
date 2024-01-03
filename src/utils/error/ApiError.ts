class ApiError extends Error {
  statusCode: number

  isOperational: boolean

  override stack?: string
  constructor(
    message: string,
    statusCode: number,
    isOperational = true,
    stack = '',
  ) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

module.exports = ApiError
