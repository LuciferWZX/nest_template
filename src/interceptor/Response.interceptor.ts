import {
  CallHandler,
  ExecutionContext,
  HttpException,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';

interface AppResponse<T> {
  code: number;
  message: string;
  data: T;
}
export class ResponseInterceptor<T>
  implements NestInterceptor<T, AppResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<AppResponse<T>> | Promise<Observable<AppResponse<T>>> {
    return next.handle().pipe(
      map((data) => ({
        code: 0, // 设置默认状态码，可以根据需要进行修改
        message: '请求成功',
        data,
      })),
      catchError((err) => {
        if (err instanceof HttpException) {
          console.error('[出错]:');
          // 如果是 HttpException，使用 HttpException 的状态码和错误消息
          return throwError(() => err);
        } else {
          // 对于其他未知异常，使用 500 状态码和默认错误消息
          const message = err instanceof Error ? err.message : '服务器内部错误';
          return throwError(() => new HttpException(message, 500));
        }
      }),
    );
  }
}
