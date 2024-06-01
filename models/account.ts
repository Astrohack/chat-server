const query = require('../database/database')
import { Community } from "../lib/types"


export default {
    exists(user_id: number) {
        return query('SELECT TRUE FROM users WHERE id=? LIMIT 1', [user_id]);
    },
    hash_by_email(email) {
        return query('SELECT id, password as hash FROM users WHERE email = ? LIMIT 1', [email]).then(([res]) => res)
    },
    brief(user_id: number) {
        return query('SELECT id, nick, avatar FROM users WHERE id=? LIMIT 1', [user_id]).then(res => res[0])
    },
    details(user_id){
        return query('SELECT id, nick, avatar FROM users WHERE id=? LIMIT 1', [user_id]).then(res => res[0])
    },
    create(email, nick, passwd): Promise<number> {
        return query('INSERT INTO users(id, nick, email, avatar, password) VALUES(NULL, ?, ?, DEFAULT, ?)', [nick, email, passwd]).then(({insertId}) => insertId)
    },
    set_avatar(user_id, avatar) {
        return query("UPDATE users SET avatar = ? WHERE id = ?", [avatar, user_id])
    },
    edit(user_id, nick, avatar, password) {
        var sql = "UPDATE users SET ", dependencies = [] as Array<string>

        if(nick) {
            sql += "nick = ?"
            dependencies.push(nick)
        }
        if(avatar) {
            sql += "avatar = ?"
            dependencies.push(avatar)
        }
        if(password) {
            sql += "password = ?"
            dependencies.push(password)
        }
        sql += "WHERE id = " + user_id
        return query(sql, dependencies)
    },
    get_conversations(user_id: number) {
        return query("SELECT channels.*, cm.last_read FROM channels JOIN channel_members cm ON channels.id=cm.channel_id WHERE cm.user_id=?", [user_id])
    },

    get_communities(user_id: number): Promise<Array<Community>> {
        return query('SELECT c.id, c.name, c.icon FROM community_members AS cm JOIN communities c ON c.id = cm.community_id WHERE cm.user_id = ?', [user_id])
    },
    get_community_ids(user_id: number): Promise<Array<number>> {
        return query('SELECT c.id FROM community_members AS cm JOIN communities c ON c.id = cm.community_id WHERE cm.user_id = ?', [user_id]).then(res => res.map(e => e.id))
    },
}