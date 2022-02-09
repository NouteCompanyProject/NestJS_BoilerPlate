
import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { UserService } from "src/user/user.service";


@Controller('/')
export class UserController {
    constructor(private userService: UserService) { } //주입을 해줘야함

    @Get('/test')
    test() {
        return 'test';
    }
}