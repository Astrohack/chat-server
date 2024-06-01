const Gateway = require('../gateway')
const Channel = require('../services/channelService');
const User = require('../models/account');
const { BadRequestError } = require('../lib/errors');



module.exports = {

    async triggerTyping({channel_id, user_id}, res) {
        const user = await User.brief(user_id)
        Gateway.send("channel."  + channel_id, "TYPING", {
            channel_id: parseInt(channel_id),
            user: user
        })
        res.sendStatus(200)
    },
    
}