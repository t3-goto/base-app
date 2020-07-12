import Express, { Application } from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';
import { createExpressServer } from 'routing-controllers';

import { env } from '../env';

/**
 * We use expressLoader to configure and start the server.
 */
export const expressLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined
) => {
  if (settings) {
    /**
     * We create a new express server instance.
     */
    const expressApp: Application = createExpressServer({
      cors: true,
      classTransformer: true,
      defaultErrorHandler: false,
      routePrefix: env.app.routePrefix,
      /**
       * We can add options about how routing-controllers should configure itself.
       * Here we specify what controllers should be registered in our express server.
       */
      controllers: env.app.dirs.controllers,
      middlewares: env.app.dirs.middlewares,
      interceptors: env.app.dirs.interceptors,
      /**
       * Authorization features
       * ★TODO★
       */
    });

    /**
     * Run application to listen on given port.
     */
    if (!env.isTest) {
      const server = expressApp.listen(env.app.port);
      settings.setData('express_server', server);
    }
    /**
     * Here we can set the data for other loaders.
     */
    settings.setData('express_app', expressApp);
  }
};
