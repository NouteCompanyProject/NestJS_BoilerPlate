import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "src/user/user.service";


@Controller('/user')
export class UserController {
    constructor(private userService: UserService) { } //주입을 해줘야함

    @Post('/signup')
    userSignUp(@Body() body) { 
        return this.userService.signUp(body.username, body.password);
    }
}