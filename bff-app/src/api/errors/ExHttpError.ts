import { HttpError } from 'routing-controllers';

export type ExHttpErrorType = {
  httpCode: number;
  errorCode: string;
  message: string;
};

export class ExHttpError extends HttpError {
  public errorCode: string;

  constructor(exHttpErrorType?: ExHttpErrorType) {
    if (exHttpErrorType !== undefined) {
      super(exHttpErrorType.httpCode, exHttpErrorType.message);
      this.errorCode = exHttpErrorType.errorCode;
    } else {
      super(500, 'Some error occurs!');
      this.errorCode = 'EHE00001';
    }
    Object.setPrototypeOf(this, ExHttpError.prototype);
  }

  toJSON(): ExHttpErrorType {
    return {
      httpCode: this.httpCode,
      errorCode: this.errorCode,
      message: this.message,
    };
  }
}
