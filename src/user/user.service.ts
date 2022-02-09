import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { winlog } from 'src/modules/log';
import * as repository from './user.repository';

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
}
