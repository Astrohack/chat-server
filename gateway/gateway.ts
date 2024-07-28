import WebSocket from 'ws';
import jwt from 'jsonwebtoken';
import { community_ids } from '@/services/accountService';
import SessionManager from '@/sessionManager';
import { Socket } from 'net';

import config from '@/config';
import logger from '@/utils/logger';

interface Gateway {
    session_manager: SessionManager;
    sessions: Object,
    wss: WebSocket
}

//TODO: Move functionality to seperate server
class Gateway {

    constructor(){
        this.session_manager; // new SessionManager()
        this.sessions = {}
        this.wss = new WebSocket.Server({
            port: config.websocketPort
        });
    }
    
    init() {
        this.wss.on('listening', e => {
            logger.info("websockets are listening on port " + config.websocketPort)
        })
        this.wss.on('connection', (socket: Socket & {user_id: number | null}, request) => {
            socket.user_id = null
            socket.on('message', payload => this.onMessage(socket, payload))
            socket.on('close', () => this.onDisconnect(socket))
        })
    }

    private async onMessage(socket, payload) {
        try {
            const {data, type } = JSON.parse(payload);
            if(!type || !data) throw new Error("Invalid payload structure, missing 'type' or 'data' ");
            if(type != "IDENTIFY") throw new Error("Unknown request, expected IDENTIFY but got " + type);
            socket.user_id = jwt.verify(data.token, config.secretKey).uid;
            if(!socket.user_id) throw new Error("Invalid token");

            const send_message = (_, data) => socket.send(data);
            const communities = await community_ids(socket.user_id);
            this.session_manager.subscribe(socket.user_id, "community.", communities, send_message)
            this.session_manager.subscribe(socket.user_id, "user.", socket.user_id, send_message)
        }
        catch(err) {
            console.log(err);
        }
    }

    private onDisconnect(socket) {
        if (!socket.user_id) return
        this.session_manager.clear_subscriptions(socket.user_id)
    }

    send(topic: string, type, payload) {
        /*PubSub.publish(topic, JSON.stringify({
            type: type,
            data: payload
        }))*/
    }
}


export default new Gateway()