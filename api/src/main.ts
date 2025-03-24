import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  
  // Habilita CORS
  app.enableCors();
  
  // Configuração de validação global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Prefixo global para todas as rotas
  app.setGlobalPrefix('api');
  
  await app.listen(3333);
  logger.log(`Application is running on: http://localhost:3333`);
}

bootstrap();
