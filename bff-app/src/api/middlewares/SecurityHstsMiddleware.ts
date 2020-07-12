import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

/**
 * We use the express middleware for security using the lib of helmet's optional hsts.
 * Caution! This middlware is not applyed, because SecurityMiddlware overwrapp this middleware!
 */
@Middleware({ type: 'before' })
export class SecurityMiddleware implements ExpressMiddlewareInterface {
  public use(req: Request, res: Response, next: NextFunction): any {
    return helmet.hsts({ maxAge: 31536000, includeSubDomains: true })(
      req,
      res,
      next
    );
  }
}
