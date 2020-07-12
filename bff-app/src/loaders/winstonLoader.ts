import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';
import { configure, format, transports } from 'winston';

import { env } from '../env';

/**
 * We use winstonLoader to configure the log's settings.
 */
export const winstonLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined
) => {
  /**
   * Configure the default logger.
   */
  configure({
    transports: [
      new transports.Console({
        level: env.log.level,
        handleExceptions: true,
        format:
          env.node !== 'development'
            ? /**
               *  If we're in production then log to the `console` with the format
               * `JSON.stringfy(object)
               */
              format.combine(format.json())
            : /**
               *  If we're not in production then log to the `console` with the format
               * `${info.level}: ${info.message} JSON.stringify({ ...rest }) ` with colorizing.
               */
              format.combine(format.colorize(), format.simple()),
      }),
    ],
  });
};
