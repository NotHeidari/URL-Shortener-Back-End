import { INestApplication } from '@nestjs/common';
import corsConfig from './cors.options';

export function setupCors(app: INestApplication) {
  app.enableCors(corsConfig);
}
