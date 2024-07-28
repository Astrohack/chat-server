import { NextFunction, Request, Response } from 'express';
import { BaseError, Levels } from '@/lib/errors';
import logger from '@/utils/logger';


/**
 * Wrap function to catch exceptions and pass them to Express NextFunction.
 */
export const catch_errors = action => (req, res, next) =>  action(req, res).catch(next)


/**
 * Middleware that handles passed from express pipeline errors.
 *  - Use logger to log exceptions.
 *  - Respond to connection initiator with exception cause.
 * @param error Occured exception
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @todo Add prometeus support
 */
export function handle_exception_middleware(error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof BaseError) {
        const payload = {
            name: error.name,
            message: error.message,
        }
        res.status(parseInt(error.httpCode)).json(payload)
        
        if (error.level >= Levels.http) return
        logger.info(`(${req.socket.remoteAddress}) ${error.name} ${error.httpCode} ${error.message}`)
    } else {
        next(error)
    }
}
