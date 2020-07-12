import { env } from '../../env';
import { Logger } from '../logger';

export const banner = (log: Logger): void => {
  if (env.app.banner) {
    const route = () => `${env.app.schema}://${env.app.host}:${env.app.port}`;
    log.info(`_______________________________________________`);
    log.info(``);
    log.info(`Your app is ready on ${route()}${env.app.routePrefix}`);
    log.info(`To shut it down, press <CTRL> + C at any time.`);
    log.info(``);
    log.info(`_______________________________________________`);
    log.info(``);
    log.info(`API Info : ${route()}${env.app.routePrefix}`);
    if (env.graphql.enabled) {
      log.info(`GraphQL  : ${route()}${env.graphql.route}`);
    }
    if (env.swagger.enabled) {
      log.info(`Swagger  : ${route()}${env.swagger.route}`);
    }
    if (env.monitor.enabled) {
      log.info(`Monitor  : ${route()}${env.monitor.route}`);
    }
    log.info(``);
    log.info(`_______________________________________________`);
    log.info(``);
    log.info(JSON.stringify(env));
  } else {
    log.info(`Application is up and running.`);
  }
};
