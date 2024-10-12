import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', // Next.js origin
    methods: 'GET',
  });
  await app.listen(3000);
}
bootstrap();
