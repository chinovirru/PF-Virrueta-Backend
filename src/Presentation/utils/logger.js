import winston from 'winston'
import { NODE_ENV } from '../config/env.config.js'

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'blue',
        http: 'grey',
        debug: 'white'
    }
}

const customTransports = () => {
    let transports = []
    if (NODE_ENV === 'production') {
        transports = [
            // new winston.transports.Console({
            //     level: 'info',
            //     format: winston.format.combine(
            //         winston.format.colorize({ colors: customLevelOptions.colors }),
            //         winston.format.simple()
            //     )
            // }),
            new winston.transports.File({
                filename: './errors.log',
                level:'warning',
                format: winston.format.simple()
            })
        ]
    } else {
        transports = [
            new winston.transports.Console({
                level: 'info',
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelOptions.colors }),
                    winston.format.simple()
                )
            })
        ]
    }

    return transports
}

const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: customTransports()
    // transports: [
    //     new winston.transports.Console({
    //         level: 'info',
    //         format: winston.format.combine(
    //             winston.format.colorize({ colors: customLevelOptions.colors }),
    //             winston.format.simple()
    //         )
    //     }),
    //     new winston.transports.File({
    //         filename: './errors.log',
    //         level:'warning',
    //         format: winston.format.simple()
    //     })
    // ]
})

const handlerLogger = (req, res, next) => {
    req.logger = logger
    // console.log('Pasa por el handlerLogger')

    // req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString}`)
    next()
}

const customLog = (level, message) => {
    // const customLogger = logger
    if (level === 'info') {
        logger.info(message)
    } else if (level === 'warning') {
        logger.warning(message)
    } else {
        logger.error(message)
    }
}

export { handlerLogger, customLog }