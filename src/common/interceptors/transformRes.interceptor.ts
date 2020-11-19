import { ExecutionContext, Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformResInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const defalutValue = {
      errNo: 0,
      errStr: 'success',
      data: {},
    };

    return next
      .handle()
      .pipe(
        map(data => {
          if (data && typeof data === 'object') {
            defalutValue.data = data;
          }
          return defalutValue;
        }),
      );
  }
}
