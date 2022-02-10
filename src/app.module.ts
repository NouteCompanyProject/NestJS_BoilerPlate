import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TestModule } from './jwt_test/test.module';
import { JwtMiddleWare } from './middleware/jwt.middleware';
import { UserModule } from './user/auth.module';


@Module({
  imports: [
    UserModule,
    TestModule
  ],
})

export class AppModule implements NestModule { 
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(JwtMiddleWare)
      .forRoutes({
        path: '/test/*',
        method: RequestMethod.ALL
      })
  }
}