import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global para todas las rutas, ej: /api/v1/auth/register
  app.setGlobalPrefix('api/v1');

  // --- Global Pipes ---
  // Activa la validación automática para todos los DTOs en la aplicación
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true -> Remueve cualquier propiedad que no esté definida en el DTO.
      // Ayuda a prevenir que se inyecten datos no deseados.
      whitelist: true,

      // forbidNonWhitelisted: true -> Lanza un error si se reciben propiedades no definidas en el DTO.
      // Es más estricto que whitelist y es bueno para la depuración.
      forbidNonWhitelisted: true,

      // transform: true -> Transforma los datos de entrada a su tipo de DTO correspondiente.
      // Por ejemplo, un string "5" en una ruta puede convertirse en un número 5.
      transform: true,
    }),
  );

  // --- Swagger ---
  // Configuración para la documentación de la API
  const config = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription('Documentación completa de la API para el E-commerce')
    .setVersion('1.0')
    .addBearerAuth() // Añade la opción para incluir un token JWT en las peticiones
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // La ruta donde se servirá la documentación
  SwaggerModule.setup('api/docs', app, document);

  // Habilitar CORS (Cross-Origin Resource Sharing) para permitir peticiones desde el frontend
  app.enableCors();

  // Iniciar la aplicación en el puerto 3000
  await app.listen(3000);

  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
  console.log(
    `📚 Swagger documentation is available at: ${await app.getUrl()}/api/docs`,
  );
}
bootstrap();