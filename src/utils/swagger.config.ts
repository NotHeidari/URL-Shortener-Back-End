import { INestApplication } from '@nestjs/common';

export async function setupSwagger(app: INestApplication) {
  const { SwaggerModule, DocumentBuilder } = await import('@nestjs/swagger');
  const config = new DocumentBuilder()
    .setTitle('URL Shortener API')
    .setDescription('API documentation for the URL Shortener service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}
