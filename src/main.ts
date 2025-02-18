import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup global validation
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*', // Permitir cualquier origen (no recomendado en producción)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Habilitar si se usan cookies o autenticación con sesiones
  });
  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Tienda Virtual API')
    .setDescription('API REST para la tienda virtual')
    .setVersion('1.0')
    .addTag('users')
    .addTag('products')
    .addTag('auth')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
