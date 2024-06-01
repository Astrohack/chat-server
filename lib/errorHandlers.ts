import { BaseError } from './errors';

export function handleAPIErrors(error, {}, res, next) {
    if (error instanceof BaseError) {
        res.status(error.httpCode).send(`{"reason":"${error.message}"}`)
        console.log("[LOG]: ", error.message, error.httpCode)
    } else {
        next(error)
    }
}

