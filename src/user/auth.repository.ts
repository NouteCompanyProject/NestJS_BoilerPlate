import { winlog } from 'src/modules/log'
import { connection, connectionClose } from '../modules/database'
import { hash, isHashValid } from '../modules/bcrypt'
import { HttpException, HttpStatus } from '@nestjs/common'
import * as dotenv from 'dotenv'
dotenv.config()



export const create = async (username: string, password: string) => {
    const db = await connection()
    winlog.info('DATABASE - User Sign Up')
    try {
        var sql = "SELECT COUNT(*) AS cnt FROM users WHERE username = ?"
        var [check] = await db.query(sql, [username])
        if (check[0].cnt === 0) {
            var hashPassword = await hash(password)
            sql = "INSERT INTO users(username,password,created_at,updated_at) VALUES(?,?,NOW(),NOW())"
            await connectionClose(db)
            await db.query(sql, [username, hashPassword])
            return true
        } else {
            await connectionClose(db)
            winlog.error('USERNAME DUPLICATE')
            return false
        }
    } catch (err) {
        await connectionClose(db)
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

export const signin = async (username: string, password: string) => {
    const db = await connection()
    winlog.info(`DATABASE - User Sign In : ${username}`)
    try {
        var sql = "SELECT * FROM users WHERE username = ?"
        var [username_check] = await db.query(sql, [username])
        if (username_check[0]) {
            var hashPassword = await hash(password)
            if (await isHashValid(password, hashPassword)) {
                return { res: true, id: username_check[0].id }
            } else {
                return { res: false } //비밀번호 불일치
            }
        } else {
            return { res: false } //아이디 없음

        }
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
