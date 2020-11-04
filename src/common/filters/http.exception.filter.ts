import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ApiException } from '../exceptions/api.exception';


/**
 * [全局异常捕获
 *  支持自定义枚举]
 *
 * @return  {[object]}  [异常状态信息]
 */
@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {

  catch(exception, host: ArgumentsHost) {
    // console.log(exception, '======== exception ========')
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus()

    if (exception instanceof ApiException) {

      // 自定义
      response
        .status(status)
        .json({
          errorCode: exception.getErrorCode(),
          errorMessage: exception.getErrorMessage(),
          date: new Date().toLocaleDateString(),
          path: request.url,
        });

    } else {
      // nest
      response
        .status(status)
        .json({
          statusCode: status,
          date: new Date().toLocaleDateString(),
          path: request.url,
        });
    }
  }
}
