/*require('./router.ts');



const request = {};


request.login = (req, con) => {
    usersDB.byEmail(req.email).then(res => {
        if (res.passwd === req.passwd) {
            session.setUserData(con, res);
            answer(new responds.Login(con, auth.generateToken(res)), con);
            console.log(con.account.nick + " logged");
        } else {
            answer(new Error(404, 'incorrect credentials'), con);
        }
    });
}

request.tokenLogin = (req, con) => {
    try {
        const res = auth.login(req.token, req.email)
        usersDB.byId(res.id).then(res => {
            session.setUserData(con, res);
            answer(new responds.Login(con, req.token), con);
            console.log(con.account.nick + " logged");
        });
    } catch (er) {
        answer(er)
    }
}

request.sendMsg = (req, con) => {
    convDB.addMessage(req, con);
    const reply = new responds.WriteReply(req, con.account)
    msgHandler.msgEmiter.emit(req.channel_id, reply)
}

const requests = {
    sendMessage: 'sendmsg',
    incomingMessage: 'incmsg',
    getMessages: 'getmsg',
    editMessage: 'editmsg',
    delMessgae: 'delmsg',
    login: 'login',
    logged: 'logged',
    error: 'error',
    //endConnect: 'ENDCON',
}

/*class Server {
    constructor(id) {
        this.id = id;
        this.channels = {};
    }

    createChannel(name) {
        channels.push(new TextChannel(top + 1, name, this.emiter));
        top++;
    }

    removeChannel(id) {
        for (let index = 0; index < this.channels.length; index++) {
            const element = this.channels[index];
            if (element == id) {
                this.channels.slice(index);
                return;

                /// remove db entry
            }
        }
    }

    getChannel(id) {
        this.channels.forEach(element => { if (element.id == id) { return element } });
        return new Error(404, 'not found');
        for (let index = 0; index < channels.length; index++) {
            const element = channels[index];
            if (element.id == parseInt(id)) { return element; }
        }
        throw new Error(404, 'not found');
    }
}


class TextChannel {
    constructor(id) {
        this.id = id;
    }
    checkPerm(user, channel) {

    }
}

class Account {
    constructor(nick, id, channels) {
        this.nick = nick;
        this.id = id;
        this.channels = channels;
    }

    static async by(key, value) {
        var prom = await new Promise(resolve => {
            let sql = `SELECT * FROM accounts WHERE ${key}=${value}`;
            db.query(sql, (er, res) => {
                if (er) { console.log(er); }
                resolve(res[0]);
            });
        });
        if (!prom) { throw new Error(404, `not found account with ${key} : ${value}`); }
        return prom;
    }
}

async function ed_message(key, value, id) {
    const sql = `UPDATE messages SET ${key}='${value}' WHERE id=${id} `;
    const promise = new Promise(resolve => {
        db.query(sql, (er) => {
            if (er) {
                console.log(er);
                return;
            }
            resolve();
        });
    });
    return promise;
}

async function del_message(id) {
    const sql = `DELETE FROM messages WHERE id=${id}`;
    const promise = new Promise(resolve => {
        db.query(sql, (er) => {
            if (er) {
                console.log(er);
                return;
            }
            resolve();
        });
    });
    return promise;
}

async function getMessages(req) {
    const promise = new Promise(resolve => {
        const sql = `SELECT * FROM messages where gid=${req.channel_id} order by id limit ${req.amount} OFFSET ${req.offset}`;
        db.query(sql, (er, res) => {
            if (er) {
                console.log("optional:  " + er);
                throw new Error(404, `not found messages`);
            }
            resolve(res);
        });
    });
    return promise;
}

function create_message(req, con) {
    var dt = new Date();
    //TextChannel.getChannel(req.channel_id).send(req, con);
    msgEmiter.emit(req.channel_id, new WriteReply(req, con.account));
    req.time = `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;
    var sql = `INSERT INTO messages (sid, gid, content,time) VALUES ( ${con.account.id}, ${req.channel_id}, "${req.content}", "${req.time}")`;
    db.query(sql, (er) => {
        if (er) { console.log(er); }
    });
}

var server = net.createServer((socket) => {
    var con = new Connection(socket);
    console.log('connected');
    //socket.pipe(socket);
    socket.on('end', () => {
        try {
            console.log("end");
            //unlinkCon(con);
            /*con.account.channels.forEach(element => {
                element.listener.removeListener('message', con.listener);
            });
        } catch (er) {
            console.log(er);
        }
        if (socket) {
            socket.destroy();
        }
        console.log('disconnect');
    });
    socket.on('error', (er) => { console.log(er) })
    socket.on('data', (data) => {
        resolve(data, con);
    });
});

function unlinkCon(con) {
    if (con.account != undefined) {
        con.account.channels.forEach(element => {
            msgEmiter.removeListener(element, con.listener);
        });
    }
}

function convert(json) {
    try {
        const res = JSON.parse(json);
        if (!'req' in res) { throw new Error(404, 'request syntax error') }
        return res;
    } catch (error) {
        throw new Error(404, 'syntax error');
    }
}


class Connection {
    constructor(socket) {
        this.socket = socket;
        this.account;
        this.listener;
    }
}

class Error {
    constructor(code, reason) {
        this.req = requests.error;
        this.code = code;
        this.reason = reason;
    }
}

server.listen(3000, '127.0.0.1');

async function resolve(data, con) {
    try {
        const req = convert(data);
        request[req.req] ? request[req.req](req, con) : () => {};
    } catch (er) {
        console.log(er);
        console.log(data.toString('utf-8'));
        answer(er, con);
    }
}
/////////////////////////////////////////////////
/*async function resolve(data, con) {
    try {
        const req = convert(data);

        if (req.req == requests.login) {
            login(req, con);
        } else {
            auth(req.token, con.account);
            switch (req.req) {
                case requests.sendMessage:
                    send_message(req, con);
                    break;
                case requests.endConnect:
                    end_connection(req, con);
                    break;
                case requests.getMessages:
                    get_messages(req, con);
                    break;
                case requests.editMessage:
                    edit_message(req, con);
                    break;
                case requests.delMessgae:
                    delete_message(req, con);
                    break;
                default:
                    throw new Error(404, 'bad request');
            }
        }

    } catch (er) {
        answer(er, con);
    }


}*/

/////////////////////////////////////////////////

/*function send_file(file, con) {
    var f = fs.createWriteStream(file);
    f.on('finish', function() {
        f.close();
    });
}

/////////////////////////////////////////////////

/*function get_file(req, con) {

}

/////////////////////////////////////////////////

async function send_message(req, con) {
    if (!'req' in req || !'channel_id' in req || !'content' in req) {
        answer(new Error(401, 'request syntax error'), con);
        return;
    }
    try {
        create_message(req, con);
    } catch (er) {
        console.log(er);
    }

}

/////////////////////////////////////////////////

async function edit_message(req, con) {
    ed_message("content", req.content, req.mid).then(() => {
        msgEmiter.emit(req.channel_id, new EditReply(req))
    });
}

/////////////////////////////////////////////////


async function delete_message(req, con) {
    //del_db_entry(req.channel_id, req.msg_id).then((res) => { msgEmiter.emit(req.channel_id, res) });
    del_message(req.mid).then(() => {
        msgEmiter.emit(req.channel_id, new DeleteReply(req))
    });
}

/////////////////////////////////////////////////

async function get_messages(req, con) {
    getMessages(req).then(res => answer(res, con)).catch(er => answer(er, con));
    //answer(obj, con);
}

/////////////////////////////////////////////////

const answer = (req, con) => {
    try {
        con.socket.write(JSON.stringify(req));
    } catch (er) {
        console.log(er);
    }
}

function end_connection(req, con) {
    // con.socket.destroy();
}

/////////////////////////////////////////////////

async function login(req, con) {
    if (!'req' in req || !'email' in req || !'passwd' in req) {
        answer(new Error(401, 'syntax error'), con);
        return;
    }
    /*var account = await Account.by('email', `"${req.email}"`); // find account with following email
    con.account = new Account(account.nick, account.id, JSON.parse(account.channels));
    if (account.passwd != req.passwd) {
        req = new Error(404, 'invalid password');
    } else {
        const token = generateToken(con.account);
        joinChannels(con);
        answer({ req: requests.sendToken, token: token }, con);
        console.log(con.account.nick + " just logged in");
    }*/
    /*Account.by('email', `"${req.email}"`).then(res => {
        con.account = new Account(res.nick, res.id, JSON.parse(res.channels));
        if (res.passwd != req.passwd) {
            req = new Error(404, 'invalid password');
        } else {
            const token = generateToken(con.account);
            joinChannels(con);
            answer({ req: requests.sendToken, token: token }, con);
            console.log(con.account.nick + " just logged in");
        }
    }).catch(er => { answer(er, con) });
    user.byEmail(req.email).then(res => {
        if (res.password == req.passwd) {
            con.session = new Session(res);
            answer({ req: requests.sendToken, token: token }, con);
        } else {
            answer(new Error(404, 'invalid passwd'));
        }
    });
}

/////////////////////////////////////////////////

function joinChannels(con) {
    con.account.channels.forEach((element) => {
        console.log(element);
        const func = (req) => {
            answer(req, con);
            console.log('someone gave something');
        };
        msgEmiter.addListener(element, func);
        con.listener = func;
    });
}

/////////////////////////////////////////////////
*/