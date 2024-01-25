import { setGlobalEnvironment } from './global'
import Environment from './environments/environment'
import express, { Express, Request, Response } from 'express'
import helmet from 'helmet'
import ExpressMongoSanitize from 'express-mongo-sanitize'
import cors from 'cors'
import httpStatus from 'http-status'
// import config from './config/config';
// import { jwtStrategy } from './modules/auth';
// import { authLimiter } from './modules/utils';
import { errorConverter, errorHandler } from './utils/error'
import expressListRoutes from 'express-list-routes'
import routes from './routes'

const env: Environment = new Environment()
setGlobalEnvironment(env)

const app: Express = express()

// set security HTTP headers
app.use(helmet())

// enable cors
app.use(cors())
app.options('*', cors())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// sanitize request data
app.use(ExpressMongoSanitize())

// limit repeated failed requests to auth endpoints
// if (global.environment.getCurrentEnvironment() === 'production') {
//   app.use('/v1/auth', authLimiter);
// }

app.get('/', async (_req: Request, res: Response) => {
  return res.send({ isSuccess: true, title: 'MyTuur API' })
})

app.get('/list', async (_req: Request, res: Response) => {
  return res.send({ isSuccess: true, title: 'MyTuur API' })
})
// v1 api routes
app.use('/api', routes)

expressListRoutes(routes)
// send back a 404 error for any unknown api request
app.use((_req, res, next) => {
  res.send({
    isSuccess: false,
    message: 'Route not found',
    code: httpStatus.NOT_FOUND,
  })
  next()
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

export default app
