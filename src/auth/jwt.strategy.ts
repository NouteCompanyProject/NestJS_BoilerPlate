import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy, ExtractJwt, JwtPayload } from 'passport-jwt';
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "src/user/user.service";
import { ConfigService } from "src/config/config.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (
        readonly configService: ConfigService,
        private readonly usersService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET_KEY'),
        });
    }
    
    async validate({ iat, exp, id }: JwtPayload, done) {
        const timeDiff = exp - iat;

        if(timeDiff <= 0) {
            throw new UnauthorizedException();
        }

        const user = await this.usersService.get(id);

        if(!user) {
            throw new UnauthorizedException();
        }

        delete user.password;
        done(null, user);
    }
}