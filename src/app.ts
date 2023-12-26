import express, { Express } from 'express';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import httpStatus from 'http-status';
// import config from './config/config';
// import { morgan } from './modules/logger';
// import { jwtStrategy } from './modules/auth';
// import { authLimiter } from './modules/utils';
import { ApiError, errorConverter, errorHandler } from './utils/error';
import routes from './routes';

const app: Express = express();

// if (config.env !== 'test') {
//   app.use(morgan.successHandler);
//   app.use(morgan.errorHandler);
// }

// set security HTTP headers
app.use(helmet());

// enable cors
app.use(cors());
app.options('*', cors());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(ExpressMongoSanitize());

// limit repeated failed requests to auth endpoints
// if (global.environment.getCurrentEnvironment() === 'production') {
//   app.use('/v1/auth', authLimiter);
// }

// v1 api routes
app.use('/api', routes);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
      next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
