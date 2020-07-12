import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';
import { useContainer as routingUseContainer } from 'routing-controllers';
import { Container } from 'typedi';

/**
 * We use iocLoader to notify the libs using the TypeDI container.
 */
export const iocLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined
) => {
  routingUseContainer(Container);
};
