const jwt = require('jsonwebtoken');
const key = "malphite";
const PubSub = require('pubsub-js');
const Account = require('../services/accountService')
const { setSubscribtions } = require('./lib/subscriber')
const {Ready, Error} = require('./resources/gatewayResponses')

module.exports = {
    identify: async function ({ token }, conn) {
        try {
            var { uid } = jwt.verify(token, key)
            conn.user_id = uid;
            setSubscribtions(conn);
            var feed = await Account.full(conn.user_id)
            conn.send(new Ready(feed))
            console.log("Verification succes")
        } catch (er) {
            console.error("Verification error");
            conn.send(new Error({code: 1, cause: "token is invalid"}))
        }  
    },

};