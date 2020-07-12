import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

/**
 * We use the express middleware for security using the lib of helmet.
 */
@Middleware({ type: 'before' })
export class SecurityMiddleware implements ExpressMiddlewareInterface {
  public use(req: Request, res: Response, next: NextFunction): any {
    return helmet()(req, res, next);
  }
}
