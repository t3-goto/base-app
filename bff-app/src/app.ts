import 'reflect-metadata';

import { bootstrapMicroframework } from 'microframework';
import { winstonLoader } from './loaders/winstonLoader';
import { iocLoader } from './loaders/iocLoader';
import { expressLoader } from './loaders/expressLoader';
import { webpackLoader } from './loaders/webpackLoader';
import { monitorLoader } from './loaders/monitorLoader';

import { Logger } from './lib/logger';
import { banner } from './lib/banner';
import { swaggerLoader } from './loaders/swaggerLoader';

const log = new Logger(__filename);
console.log(`${log.getScope()} ${__filename}`);

bootstrapMicroframework({
  /**
   * Loader is a place where you can configure all your modules during microframework
   * bootstrap process. All loaders are executed one by one in a sequential order.
   */
  loaders: [
    winstonLoader,
    iocLoader,
    expressLoader,
    webpackLoader,
    swaggerLoader,
    monitorLoader,
  ],
})
  .then(() => banner(log))
  .catch((error) =>
    log.error(
      `Application is crashed during bootstrap process. Because: ${error}`
    )
  );
