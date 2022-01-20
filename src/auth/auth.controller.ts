import { Controller, Post, Body, } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user';
import { AuthService } from './auth.service';
import { LoginPayload } from './login.payload';
import { RegisterPayload } from './register.payload';

@Controller('auth')
// Swagger 등록
@ApiTags('authentication')
export class AuthController {
    constructor (
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}
    
    // 로그인
    @Post('login')
    @ApiResponse({ status: 201, description: '로그인 성공' })
    @ApiResponse({ status: 400, description: '요청 실패' })
    @ApiResponse({ status: 401, description: '유효하지 않은 요청' })
    async login(@Body() payload: LoginPayload): Promise<any> {
        const user = await this.authService.validator(payload);
        return await this.authService.createToken(user);
    }

    // 회원가입
    @Post('register')
    @ApiResponse({ status: 201, description: '회원가입 성공' })
    @ApiResponse({ status: 400, description: '요청 실패' })
    @ApiResponse({ status: 401, description: '유효하지 않은 요청' })
    async register(@Body() payload: RegisterPayload): Promise<any> {
        const user = await this.userService.create(payload);
        return await this.authService.createToken(user);
    }
}
