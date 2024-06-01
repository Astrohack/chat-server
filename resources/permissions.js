const permissions = {
    "ADMINISTRATOR": 1,
    "SEND_MESSAGES": 1 << 1,
    "MANAGE_MESSAGES": 1 << 2,
    "VIEW_CHANNEL": 1 << 3,
    "MANAGE_CHANNELS": 1 << 4,
    "CHANGE_NICKNAME": 1 << 5,
    "MANAGE_ROLES": 1 << 6,
    "KICK_MEMBERS": 1 << 7,
    "MANAGE_GUILD" : 1 << 8,
    "BAN_MEMBERS": 1 << 9,
    "MUTE_MEMBERS": 1 << 10,
    "DEAF_MEMBERS": 1 << 11,
    "CAN_CONNECT": 1 << 12,
    "CAN_MENTION": 1 << 13 
}

module.exports = permissions