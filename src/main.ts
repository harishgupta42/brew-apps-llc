import { i18nValidationErrorFactory } from 'nestjs-i18n';

import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AllExceptionsFilter } from './all-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: i18nValidationErrorFactory,
    }),
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
    }),
  );
  app.setGlobalPrefix(process.env.BASE_PATH || '');
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  /**
   * Swagger Configuration
   */
  if (process.env.SET_SWAGGER === 'true') {
    const config = new DocumentBuilder()
      .setTitle(process.env.NAME || '')
      .setDescription(process.env.DESCRIPTION || '')
      .setVersion(process.env.VERSION || '')
      .addBasicAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(
      `${process.env.BASE_PATH || ''}/swagger`,
      app,
      document,
    );
  }
  app.enableCors();
  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
