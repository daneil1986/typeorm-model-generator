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
    const status = (exception.getStatus && exception.getStatus()) || 500;

    if (+status === 404) {
      response.status(status).json({
        errNo: 66666,
        errStr: '页面不存在，请稍后重试~',
      });
      return;
    }

    if (exception instanceof ApiException) {

      // 自定义
      response
        .status(status)
        .json({
          errNo: exception.getErrorCode(),
          errStr: exception.getErrorMessage(),
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
