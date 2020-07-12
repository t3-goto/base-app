import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';
import statusMonitor from 'express-status-monitor';
import basicAuth from 'express-basic-auth';

import { env } from '../env';

/**
 * This is the loader to monitor the server status using the lib of express-status-monitor.
 */
export const monitorLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined
) => {
  if (settings && env.monitor.enabled) {
    /**
     * Here we can use the data from other loaders.
     */
    const expressApp = settings.getData('express_app');
    /**
     * Here we can configure the express-status-monitor.
     */
    const config = {
      title: 'Express Status',
      path: env.monitor.route,
      spans: [
        {
          interval: 1,
          retention: 60,
        },
        {
          interval: 5,
          retention: 60,
        },
        {
          interval: 15,
          retention: 60,
        },
      ],
      chartVisibility: {
        cpu: true,
        mem: true,
        load: true,
        responseTime: true,
        rps: true,
        statusCodes: true,
      },
      healthChecks: [
        {
          protocol: env.app.schema,
          host: env.app.host,
          path: '/',
          port: env.app.port,
        },
      ],
    };
    expressApp.use(statusMonitor(config));
  }
};
