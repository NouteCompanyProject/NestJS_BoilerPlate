import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
}

bootstrap();
