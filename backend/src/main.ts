import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable Cross-Origin requests from the React frontend
  app.enableCors();

  // Set global prefix required by the React frontend (/api/auth/...)
  app.setGlobalPrefix('api');

  // Enable automatic validation of incoming data via DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Listen on port 3001 as expected by the frontend
  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();