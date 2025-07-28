import { loadEnv } from './utils/env.config';
loadEnv();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger.config';
import { setupCors } from './utils/cors/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // فعال‌سازی CORS
  setupCors(app);

  // Swagger setup
  await setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
