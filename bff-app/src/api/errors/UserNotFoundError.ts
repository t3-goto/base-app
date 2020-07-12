import { ExHttpError } from './ExHttpError';
import { ExHttpErrorConsts } from './ExHttpErrorConsts';

export class UserNotFoundError extends ExHttpError {
  constructor() {
    super(ExHttpErrorConsts.UserNotFoundError);
  }
}
