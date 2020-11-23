import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const url = context.getArgs()[0].url;
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`${url} 耗时: ${Date.now() - now}ms`)));
  }
}
