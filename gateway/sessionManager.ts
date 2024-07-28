import PubSub from 'pubsub-js';

interface SessionManager {
    sessions: Object;
}
class SessionManager implements SessionManager {

    constructor() {
        this.sessions = {}
    }

    subscribe(user_id, topic_prefix, topics, callback) {
        if (!this.sessions[user_id]) this.sessions[user_id] = {};
        if (typeof topics === 'number')
        this.sessions[user_id][topics] = PubSub.subscribe(topic_prefix + topics, callback);
        else
        for (let topic of topics) {
            this.sessions[user_id][topic] = PubSub.subscribe(topic_prefix + topic, callback);
        }
    }

    unsubscribe_one(user_id, topic) {
        PubSub.unsubscribe(this.sessions[user_id][topic]);
        delete this.sessions[user_id][topic];
    }
    
    clear_subscriptions(user_id) {
        if ( !this.sessions[user_id] ) return;
        for (let key of Object.entries(this.sessions[user_id])){
            PubSub.unsubscribe(key);
        }
        delete this.sessions[user_id];
    }
}
export default SessionManager