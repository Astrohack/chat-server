class WriteReply {
    constructor(req, sender) {
        this.req = 'INCMSG';
        this.channel = new String(req.channel_id);
        this.sender = { nick: sender.nick, id: new String(sender.id), avatar: "coming soon" }
        this.content = new String(req.content);
        this.id = req.id;
        this.time = req.time;
    }
}

class DeleteMessage {
    constructor(req) {
        this.req = 'DELMSG';
        this.channel = req.channel_id;
        this.mid = req.mid;
    }
}
class EditMessage {
    constructor(req) {
        this.req = 'EDITMSG';
        this.channel = req.channel_id;
        this.content = req.content;
        this.mid = req.mid;
    }
}

class Messages {
    constructor(req, sender) {

    }
}

class Login {
    constructor(con, token) {
        this.token = token;
        this.id = con.account.id;
        this.nick = con.account.nick;
    }
}

module.exports = {
    Login,
    WriteReply,
    DeleteMessage
}