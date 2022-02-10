import { Controller, Get, Req } from "@nestjs/common";


@Controller('/test')
export class TestController {

    @Get('/')
    jwtTest(@Req() req) {
        return req.user
    }
}