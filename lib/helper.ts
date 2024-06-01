import jwt from 'jsonwebtoken';
import config from '../config';

export const generate_access_token = function(userId) {
    return jwt.sign({
        uid: userId
    }, config.secretKey, {
        expiresIn: config.tokenExpirity
    })
}

export const current_timestamp = function() {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
}