import winston from 'winston';

const { colorize, combine, timestamp, json, errors, align, printf } = winston.format;

const logger = winston.createLogger({
  level: 'info',
  format: combine(colorize({ all: true }), timestamp(), align(), errors({ stack: true }), printf((info) => `(${info.timestamp}) [${info.level}]: ${info.message}`)),
  transports: [new winston.transports.Console()],
});

export default logger