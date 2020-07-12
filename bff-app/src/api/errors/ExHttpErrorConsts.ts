import { ExHttpErrorType } from './ExHttpError';

export namespace ExHttpErrorConsts {
  export const UserNotFoundError: ExHttpErrorType = {
    httpCode: 404,
    errorCode: 'UNFE001',
    message: 'User not found!',
  };
}
