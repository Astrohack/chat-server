const User = require('../services/accountService');
const Gateway = require('../gateway')


module.exports = {
    async get_communities({user_id}, res) {
        const communities = await User.communities(user_id)
        res.send(communities)
    },

    async profile({user_id}, res) {
        
        const profile = await User.details(user_id)
        res.send(profile)
    },
    async set_avatar({user_id, file}, res) {
        const filename = await User.set_avatar(user_id, file)
        Gateway.send("user." + user_id, "PROFILE_EDIT", {
            user_id,
            avatar: filename
        })        
        res.sendStatus(200)
    }
}


