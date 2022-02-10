import { Module } from '@nestjs/common';
import { UserService } from './auth.service';
import { UserController } from './auth.controller'


@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})

export class UserModule { }
