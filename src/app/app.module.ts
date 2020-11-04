import { Module, Global, NestModule, MiddlewareConsumer, RequestMethod, HttpModule } from '@nestjs/common';
import * as winston from 'winston';
import * as config from 'config';

import { WinstonModule, LoggerMiddleware } from '@node/nest-logger';
import { IpsMiddleware } from '../common/middleware/ips.middleware';

import { AppController } from './app.controller';
import { AuthController } from '../auth/auth.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';

// IPS 登录
// import { ZybussMiddleware } from '../common/middleware/zybuss.middleware'; // C端zybuss换uid

@Global()
@Module({
  imports: [
    // IO请求模块
    HttpModule.register({
      // baseURL: config.get<string>('http.baseURL'),
      timeout: config.get<string>('http.timeout'),
      maxRedirects: config.get<number>('http.maxRedirects')
    }),
    // 日志模块
    WinstonModule.forRoot({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: 'log/access.log', level: 'info' }),
        new winston.transports.File({ filename: 'log/access.log.wf', level: 'error' }),
        // 标准输出
        new winston.transports.Console()
      ]
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [HttpModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        IpsMiddleware({
          _sid: config.sid,
          _secret: config.secret,
          _service: config.service,
          _port: config.redisServer.port,
          _host: config.redisServer.host
        })
      )
      .exclude({ path: '/redirect', method: RequestMethod.ALL })
      .forRoutes(AuthController);

    consumer
      .apply(LoggerMiddleware)
      .forRoutes(AuthController);
  }
}
