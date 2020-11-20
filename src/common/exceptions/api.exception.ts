import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorCode, errNoAndErrStrMap } from './api.code.enum';

/**
 * [HttpException 自定义api异常 派生类]
 */
export class ApiException extends HttpException {

  private errorMessage: string;
  private errorCode: ApiErrorCode;

  constructor(errorCode: ApiErrorCode, errorMessage?: string, statusCode: HttpStatus = HttpStatus.OK) {

    super(errorMessage, statusCode);

    this.errorMessage = errorMessage || errNoAndErrStrMap[this.errorCode] || '';
    this.errorCode = errorCode;
  }

  getErrorCode(): ApiErrorCode {
    return this.errorCode;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
