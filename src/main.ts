

// Load environment variables based on NODE_ENV (must be first)
import * as path from 'path';
import * as dotenv from 'dotenv';
const envFile = process.env.NODE_ENV === 'production' ? '.production.env' : '.development.env';
dotenv.config({ path: path.resolve(__dirname, '..', envFile) });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger setup
  const { SwaggerModule, DocumentBuilder } = await import('@nestjs/swagger');
  const config = new DocumentBuilder()
    .setTitle('URL Shortener API')
    .setDescription('API documentation for the URL Shortener service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
