import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

import { env } from '../../env';
import { Logger, LoggerInterface } from '../../decorators/Logger';

/**
 * We use the express middleware for logging.
 */
@Middleware({ type: 'before' })
export class LoggerMiddleware implements ExpressMiddlewareInterface {
  constructor(@Logger(__filename) private log: LoggerInterface) {}

  public use(req: Request, res: Response, next: NextFunction): any {
    return morgan(env.log.output, {
      stream: { write: this.log.info.bind(this.log) },
    })(req, res, next);
  }
}
