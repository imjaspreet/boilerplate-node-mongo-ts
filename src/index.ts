import { setGlobalEnvironment } from './global';
import app from './app';
import Environment from './environments/environment';
import createLogger from './helpers/logger';

const logger = createLogger('Index.ts');

const env: Environment = new Environment();
setGlobalEnvironment(env);



let server: any;

server = app.listen(env.port, () => {
  logger.info(`Listening to port ${env.port}`);
});

const exitHandler = () => {
    if (server) {
      server.close(() => {
        // logger.info('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
};
  
const unexpectedErrorHandler = (error: string) => {
    // logger.error(error);
    exitHandler();
};
  
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
  
process.on('SIGTERM', () => {
    // logger.info('SIGTERM received');
    if (server) {
      server.close();
    }
});
  