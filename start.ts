const net = require('net');

const app = require('./router');

const gateway = require('./gateway')

async function initializeServer() {

    /*function initTcpSocket() {
        var server = net.createServer(function (socket) {

            var user = {
                id: Number,
                listeners: [],
                logged: false
            };

            // When somebody sends data
            socket.on('data', function (data) {
                try {
                    // check if he is logged
                    if (!user.logged) {
                        const message = JSON.parse(data)
                        if (message.type != 'login') return
                        login(message.token)
                        return
                    }
                    // process request
                    resolve(message, user);
                } catch (er) {
                    socket.write("you fucked something")
                }
            })

            // When someone connects
            socket.on('connect', function () {
                console.log("connection opened")
            })
            socket.on('error', function (er) {
                console.log(er)
            })

            // When someone disconnects
            socket.on('close', function () {
                console.log("connection closed")
                // cancel subscribtions
                deleteSubscribstions(user)
            })

            // verify token
            function login(token) {
                try {
                    var payload = jwt.verify(token, config.secretKey)
                    user.id = payload.uid
                    socket.write('{"type":"logged"}')
                } catch (er) {
                    return
                }
                setSubscribtions(user, (msg, data) => {
                    socket.write(JSON.stringify(data))
                });
            }
        });
        server.listen(config.websocketPort, config.host);
    }*/

   
}

initializeServer()