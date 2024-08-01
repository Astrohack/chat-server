import config from '@/config';
import { Request } from 'express';
import winston from 'winston';

const { colorize, combine, timestamp, json, errors, align, printf } = winston.format;

const logger = winston.createLogger({
  level: config.logLevel ?? 'error',
  format: combine(colorize({ all: true }), timestamp(), align(), errors({ stack: true }), printf((info) => `(${info.timestamp}) [${info.level}]: ${info.message}`)),
  transports: [new winston.transports.Console()],
});

export default logger

export function logger_middleware(req: Request, _, next) {
    logger.debug(`(${req.socket.remoteAddress}) ${req.method} ${req.path} ${JSON.stringify(req.body)}`);
    next();
}