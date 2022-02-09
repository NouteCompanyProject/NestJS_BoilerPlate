import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { init } from './modules/database';
import { winlog } from './modules/log'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false //nest자체의 로그 끔
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  //서버 포트 연결
  await app.listen(3000, () => {
    winlog.info('SERVER - 3000PORT CONNECTED')
  });
  //데이터베이스 연결
  await init();
}

bootstrap();
