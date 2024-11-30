import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { cwd } from 'process';

async function bootstrap() {
  // Criação do app como NestExpressApplication
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuração do motor de visualização EJS
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(cwd(), 'src', 'views')); // Caminho absoluto para src/views

  // Middleware para servir arquivos estáticos
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Validação global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove propriedades não decoradas
    forbidNonWhitelisted: true, // Retorna erro se houver propriedades não permitidas
    transform: true, // Transforma os objetos de entrada em instâncias de DTO
  }));

  // Porta de escuta
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Aplicação rodando em http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();

