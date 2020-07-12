import { Request, Response, NextFunction } from 'express';
import nocache from 'nocache';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

/**
 * We use the express middleware for security using the lib of nocache.
 */
@Middleware({ type: 'before' })
export class SecurityMiddleware implements ExpressMiddlewareInterface {
  public use(req: Request, res: Response, next: NextFunction): any {
    return nocache()(req, res, next);
  }
}
