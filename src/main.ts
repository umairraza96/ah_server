import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // set global prefix
  app.setGlobalPrefix('api');
  // enable versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    // whitelist: true will remove all properties that are not defined in the DTO
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // listen on port 4040
  await app.listen(4040);
}
bootstrap();
