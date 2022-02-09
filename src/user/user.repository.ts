import { winlog } from 'src/modules/log'
import { connection, connectionClose } from '../modules/database'
import { hash, isHashValid } from '../modules/bcrypt'
import { HttpException, HttpStatus } from '@nestjs/common'


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
    winlog.info('DATABASE - User Sign In')
    try {
        
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
