import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';

import BaseRouter from './routes/index';
import logger from 'jet-logger';
import envVars from '@shared/env-vars';
import { CustomError } from '@shared/errors';

import { NodeEnvs } from '@shared/enums';


// **** Init express **** //

const app = express();


// **** Set basic express settings **** //

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(envVars.cookieProps.secret));

// Show routes called in console during development
if (envVars.nodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security
if (envVars.nodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}


// **** Add API routes **** //

// Add APIs
app.use('/', BaseRouter);

// Setup error handler
app.use((
  err: Error | CustomError,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: NextFunction,
) => {
  logger.err(err, true);
  // Status
  const status = (
    err instanceof CustomError 
      ? err.HttpStatus 
      : StatusCodes.BAD_REQUEST
  );
  // Return
  return res.status(status).json({
    error: err.message,
  });
});


// **** Export default **** //

export default app;
