const jwt = require('jsonwebtoken');
const { UnauthorizedError, ForbiddenError } = require('../lib/errors');
const config = require('../config/default.json')
const { is_channel_member } = require('../models/account');


exports.check_perms = (permToCheck) => async function ({user_id, channel_id}, res, next){
    const [can] = await is_channel_member(user_id, channel_id)
    if(can) next()
    else next(new ForbiddenError('you dont have permissions to access this source'))
}

exports.authorize = function(req, res, next) {
    if(!req.headers.authorization) return next(new UnauthorizedError("no token provided"))
    try {
        req.user_id =  jwt.verify(req.headers.authorization.substr(7), config.secretKey).uid
        next()
    } catch {
        next(new UnauthorizedError("incorrect token"))
    }
}