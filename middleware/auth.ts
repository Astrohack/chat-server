import jwt from 'jsonwebtoken'
import { UnauthorizedError, ForbiddenError } from '@/lib/errors';
import { config } from '@/config';
import { Response, Request } from 'express';

export const authorize = (permToCheck?: number) => async function ({ user_id, channel_id }, res, next) {
    next(new ForbiddenError('you dont have permissions to access this source'))
}

interface Metadata extends Request {
    user_id: number,
}

export const authenticate  = function (req: Metadata, res: Response, next) {
    if (!req.headers.authorization) return next(new UnauthorizedError("no token provided"))
    try {
        req.user_id = jwt.verify(req.headers.authorization.substr(7), config.secretKey).uid
        next()
    } catch {
        next(new UnauthorizedError("incorrect token"))
    }
}