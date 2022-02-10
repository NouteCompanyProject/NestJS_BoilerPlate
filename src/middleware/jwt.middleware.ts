import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import { winlog } from "src/modules/log";
import * as dotenv from 'dotenv'
dotenv.config()
const jwt_secret = process.env.JWT_SCERET_KEY


@Injectable()
export class JwtMiddleWare implements NestMiddleware<Request, Response> {
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            var accessToken = req.headers['x-auth']
            jwt.verify(accessToken.toString(), jwt_secret, (err, user) => {
                if (err) {
                    winlog.error('"MIDDLEWARE - TOKEN_EXPIRE')
                    res.status(403).json({ "resultCode": -30, "data": null })
                } else {
                    winlog.info("MIDDLEWARE - TOKEN_SUCCESS");
                    req['user'] = user
                    next()
                }
            })
        } catch (err) {
            winlog.error(err)
            console.log(err)
            res.status(400).json({ "resultCode": -1, "data": null })
        }
    }
}