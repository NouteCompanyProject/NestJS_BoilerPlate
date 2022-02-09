import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { init } from './modules/database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000, () => {
    console.log('SERVER - 3000PORT CONNECTED')
  });
  await init();
}

bootstrap();
