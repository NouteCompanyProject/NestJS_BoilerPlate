import * as winston from 'winston'

export const winlog = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.printf(
                info => `[${info.level.toUpperCase()}] [${new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '')}] ${info.message}`
            )
        })
    ]
})