import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend and admin
  app.enableCors({
    origin: '*', // allow local origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`🚀 Good Life Enterprise NestJS API running on: http://localhost:${port}`);
  console.log(`📌 Platforms API: http://localhost:${port}/api/v1/platforms`);
  console.log(`📌 Brands API: http://localhost:${port}/api/v1/brands`);
  console.log(`📌 Categories API: http://localhost:${port}/api/v1/categories`);
}

bootstrap();
