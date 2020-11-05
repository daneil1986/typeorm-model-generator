import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as config from 'config';
import * as cookieParser from 'cookie-parser';
import * as Sentry from '@sentry/node';
import * as redis from 'redis';
import * as connectredis from 'connect-redis';
import * as session from 'express-session';
import * as health from '@cloudnative/health-connect';
import { clsMiddleware } from '@node/cls';

import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './common/filters/http.exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';


async function bootstrap() {

  const app = await NestFactory.create(AppModule)

  const RedisStore = connectredis(session)
  const redisClient = redis.createClient(config.redisServer.port, config.redisServer.host)

  app.setGlobalPrefix('preschool')

  // https://github.com/cloudnativejs/cloud-health-connect
  app.use('/health', health.HealthEndpoint(new health.HealthChecker()))

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: 'z_project_server',
      resave: true,
      saveUninitialized: true
    })
  )

  // bind req res
  app.use(clsMiddleware())

  // Sentry.init({ dsn: '__PUBLIC_DSN__' });
  // app.use(Sentry.Handlers.requestHandler());
  // app.use(Sentry.Handlers.errorHandler());

  // app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())

  // https://github.com/helmetjs/helmet
  app.use(helmet())
  app.enableCors()
  app.use(cookieParser())
  await app.listen(config.get('port'))
}
bootstrap();
