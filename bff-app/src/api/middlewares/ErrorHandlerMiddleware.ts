import { Request, Response, NextFunction } from 'express';
import {
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
} from 'routing-controllers';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { ExHttpError } from '../errors/ExHttpError';
import { env } from '../../env';

/**
 * We use the express middleware for the custom error handler.
 */
@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  public isProduction = env.isProduction;

  constructor(@Logger(__filename) private log: LoggerInterface) {}

  public error(
    error: ExHttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    res.status(error.httpCode || 500);
    res.json({
      error: {
        code: error.errorCode,
        message: error.message,
      },
    });

    /**
     * If any error occurs, logging with winston loger.
     */
    if (this.isProduction) {
      this.log.error(JSON.stringify(error));
    } else {
      this.log.error(JSON.stringify(error), error.stack);
    }
  }
}
