import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';

import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

const config = require('../../webpack.dev.config');

const compiler = webpack(config);

/**
 * We use webpackLoader to configure the HMR on development mode.
 */
export const webpackLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined
) => {
  if (settings) {
    /**
     * Here we can use the data from other loaders.
     */
    const expressApp = settings.getData('express_app');

    /**
     * If the app will not be running on production mode,
     * We can use HMR (Hot Module Replacement) settings.
     */
    if (process.env.NODE_ENV !== 'production') {
      expressApp.use(hotMiddleware(compiler));
      expressApp.use(
        devMiddleware(compiler, {
          publicPath: config.output.publicPath,
        })
      );
    }
  }
};
