
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Load environment variables based on NODE_ENV
import * as path from 'path';
import * as dotenv from 'dotenv';
const envFile = process.env.NODE_ENV === 'production' ? '.production.env' : '.development.env';
dotenv.config({ path: path.resolve(__dirname, '..', envFile) });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
