import { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

/**
 * We use the express middleware for compression of the HTTP response.
 */
@Middleware({ type: 'before' })
export class CompressionMiddleware implements ExpressMiddlewareInterface {
  public use(req: Request, res: Response, next: NextFunction): any {
    return compression()(req, res, next);
  }
}
