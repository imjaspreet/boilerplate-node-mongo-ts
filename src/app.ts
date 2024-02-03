import { setGlobalEnvironment } from './global'
import Environment from './environments/environment'
import express, { Express, Request, Response } from 'express'
import helmet from 'helmet'
import ExpressMongoSanitize from 'express-mongo-sanitize'
import cors from 'cors'
import httpStatus from 'http-status'
import multer from 'multer'
import { errorConverter, errorHandler } from './utils/error'
import expressListRoutes from 'express-list-routes'
import routes from './routes'
import path from 'path'
const env: Environment = new Environment()
setGlobalEnvironment(env)
const upload = multer({ storage: multer.memoryStorage() })
const app: Express = express()
import job from './scheduler/cron'

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
//media Uploads
app.use(upload.any())

app.get('/', async (_req: Request, res: Response) => {
  return res.send({ isSuccess: true, title: 'MyTuur API' })
})

// v1 api routes
app.use('/api', routes)

app.get('/api-docs', async (_req: Request, res: Response) => {
  return res.send({ isSuccess: true, routes: expressListRoutes(routes) })
})

app.use('/files', express.static(path.join(__dirname, '/public')))
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
job()
export default app
