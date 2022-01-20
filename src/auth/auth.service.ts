import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { LoginPayload } from './login.payload';
import { Hash } from 'src/utils/Hash';
import { ConfigService } from 'src/config/config.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}
    
    // Access Token 생성
    async createToken(user: User) {
        return {
            expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
            accessToken: this.jwtService.sign({ id: user.id }),
            user,
        };
    }

    // 유효성 검사
    async validator(payload: LoginPayload): Promise<any> {
        const user = await this.userService.getByEmail(payload.email);

        if(!user || !Hash.compare(payload.password, user.password)) {
            throw new UnauthorizedException('유효하지 않은 인증입니다');
        }

        return user;
    }  
}
