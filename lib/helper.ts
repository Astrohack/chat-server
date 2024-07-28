import jwt from 'jsonwebtoken';
import config from '../config';

export const generate_access_token = function (userId) {
    return jwt.sign(
        { uid: userId },
        config.secretKey,
        { expiresIn: config.tokenExpirity }
    )
}

export const generate_id = function (): string {
    return Date.now().toString() + config.serverId
}