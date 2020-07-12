import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';
import { defaultMetadataStorage as classTransformerMetadataStorage } from 'class-transformer/storage';
import { getFromContainer, MetadataStorage } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import basicAuth from 'express-basic-auth';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUi from 'swagger-ui-express';

import { env } from '../env';

/**
 * This is the Loader for Swagger's setup.
 * Generating the swagger file automatically by the lib of routing-controllers-openapi,
 * the swagger file will be serving by the lib of swagger-ui-express.
 */
export const swaggerLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined
) => {
  if (settings && env.swagger.enabled) {
    /**
     * Here we can use the data from other loaders.
     */
    const expressApp = settings.getData('express_app');

    /**
     * We use class-validator-jsonschema to convert our validation class
     * into OpenAPI-compatible shemas.
     */
    // const schemas = validationMetadatasToSchemas({
    //   classValidatorMetadataStorage: getFromContainer(MetadataStorage),
    //   classTransformerMetadataStorage,
    //   refPointerPrefix: '#/components/schemas/',
    // });
    const schemas = validationMetadatasToSchemas({
      refPointerPrefix: '#/components/schemas/',
    });

    /**
     * We generage the swagger file from the all our controllers with OpenAPI decorator
     * by the lib of routing-controllers-openapi automatically.
     */
    const swaggerFile = routingControllersToSpec(
      getMetadataArgsStorage(),
      {},
      {
        components: {
          schemas,
          securitySchemes: { basicAuth: { type: 'http', scheme: 'basic' } },
        },
      }
    );

    swaggerFile.info = {
      title: env.app.name,
      description: env.app.description,
      version: env.app.version,
    };

    swaggerFile.servers = [
      {
        url: `${env.app.schema}://${env.app.host}:${env.app.port}${env.app.routePrefix}`,
      },
    ];

    /**
     * We set the swagger ui with basic authentication.
     */
    expressApp.use(
      env.swagger.route,
      env.swagger.username
        ? basicAuth({
            users: {
              [`${env.swagger.username}`]: env.swagger.password,
            },
            challenge: true,
          })
        : (req, res, next) => next(),
      swaggerUi.serve,
      swaggerUi.setup(swaggerFile)
    );
  }
};
