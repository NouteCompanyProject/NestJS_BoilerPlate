import { createPool } from 'mysql2/promise'
import { winlog } from '../modules/log'
import * as dotenv from 'dotenv'
dotenv.config()


const mysql_config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: false
}

const pool_opts = { //createPool에 인자로 안넣어짐
    max: 40,
    min: 5
}

const db_conn_pool = createPool(mysql_config);


export const connection = async () => {
    return await db_conn_pool.getConnection()
}
export const connectionClose = async (conn) => {
    await conn.release()
}

const createTables = async (conn) => {
    try {
        var sql = "CREATE TABLE IF NOT EXISTS users ("
        sql += "id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, "
        sql += "username varchar(100) NOT NULL, "
        sql += "password varchar(255) NOT NULL, "
        sql += "created_at timestamp, ";
        sql += "updated_at timestamp ";
        sql += ") ENGINE=InnoDB DEFAULT CHARACTER SET=utf8";

        await conn.query(sql)

        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

export const init = async () => {
    try {
        var conn = await connection();
        var tableinit = await createTables(conn);
        await connectionClose(conn);
        if (tableinit) {
            winlog.info("DATABASE - TABLE CREATE SUCCESS")
        } else {
            winlog.info("DATABASE - TABLE CREATE FAIL")
        }
        winlog.info("DATABASE - CONNECT SUCCESS")
    } catch (err) {
        winlog.info("DATABASE - CONNECT FAIL")
        console.log(err)
    }
}