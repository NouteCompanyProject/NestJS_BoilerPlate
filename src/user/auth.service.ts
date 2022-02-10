import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { winlog } from 'src/modules/log';
import * as repository from './auth.repository';
import * as jwt from 'jsonwebtoken'
const jwt_sceret = process.env.JWT_SCERET_KEY


@Injectable()
export class UserService {

    async signUp(username: string, password: string) {
        winlog.info('API - User Sign Up')
        try {
            var resultCode = 0
            var result = await repository.create(username, password)
            if (result) {
                resultCode = 1 //성공
            } else {
                resultCode = 1001 //쿼리 에러
            }
            return { "resultCode": resultCode, "data": null }
        } catch (err) {
            winlog.error(err)
            console.log(err)
            throw new HttpException(
                {
                    resultCode: -1,
                    data: null
                },
                HttpStatus.FORBIDDEN
            )
        }
    }

    async signIn(username: string, password: string) {
        winlog.info('API - User Sign In')
        try {
            var resultCode = 0
            var data = null
            var result = await repository.signin(username, password)
            if (result.res) {
                winlog.info('SIGN IN SUCCESS')
                resultCode = 1
                var accessToken = jwt.sign({ id: result.id }, jwt_sceret, { expiresIn: '1h' })
                var refreshToken = jwt.sign({ id: result.id }, jwt_sceret, { expiresIn: '1d' })
                data = {
                    accessToken,
                    refreshToken,
                    id:result.id
                }
            } else {
                winlog.error('ID OR PASSWORD INVAILD')
                resultCode = 1002 // 아이디 또는 비밀번호 틀림
            }
            return { resultCode, data }
        } catch (err) {
            winlog.error(err)
            console.log(err)
            throw new HttpException(
                {
                    resultCode: -1,
                    data: null
                },
                HttpStatus.FORBIDDEN
            )
        }
    }
}
