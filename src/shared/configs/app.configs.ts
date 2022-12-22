import { DocumentBuilder } from '@nestjs/swagger';
import {
  GlobalCustomExceptionInterceptor,
  GlobalCustomExceptionFilter,
  GlobalThrottlerGuard,
  GlobalJwtAuthGuard,
} from './app-constants';

export const GlobalInterceptors = [GlobalCustomExceptionInterceptor];

export const GlobalFilters = [GlobalCustomExceptionFilter];

export const GlobalGuards = [GlobalThrottlerGuard, GlobalJwtAuthGuard];

export const SwaggerConfig = new DocumentBuilder()
  .setTitle('Netflix')
  .setDescription('Movies and TV Shows for free!')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth',
  )
  .build();
