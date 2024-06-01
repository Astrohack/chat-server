const User = require('../services/accountService');
const { generate_access_token } = require('../lib/helper');
const config = require('../config')
const {
    NotFoundError,
    BadRequestError,
    APIError,
    ConflictError,
    UnauthorizedError
} = require('../lib/errors');


module.exports = {

    async register({body: {email, password, nick}}, res) {
        if(!email || !password || !nick) throw new BadRequestError('missing params')
        const user_id = await User.create(email, nick, password)
        if(!user_id) throw new APIError('something went wrong during account creation')
        res.send(`{"token":"${generate_access_token(user_id)}","expires_in":"${config.tokenExpirity}"}`)
    },

    async login({body: {password, email}}, res) {
        if(!email || !password) throw new BadRequestError('missing params');
        const user_id = await User.authenticate(email, password);
        res.send(`{"token":"${generate_access_token(user_id)}","expires_in":"${config.tokenExpirity}"}`);
    }

}


