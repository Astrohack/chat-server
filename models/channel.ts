const query = require('../database/database')
import { Channel, MessageDataObject } from "../lib/types"

export default {
    get_basic_info(channel_id: number): Promise<Channel> { return query('SELECT id, name FROM channels WHERE id=? LIMIT 1', [channel_id]) },

    post_ack(message_id: number): Promise<void> { return query('')},

    get_by_community(community_id: number): Promise<Channel> { return query('SELECT id, name FROM channels WHERE community_id=?', [community_id]) },

    get_messages(channel_id: number, amount: number): Promise<MessageDataObject[]> { 
        return query('SELECT * FROM messages WHERE channel_id=? ORDER BY id ASC LIMIT ?', [channel_id, amount])
    },

    get_message(message_id: number): Promise<MessageDataObject>{ return query('SELECT * FROM messages WHERE id=?', [message_id]).then(res => res[0]) },

    get_messages_before(channel_id: number, amount: number, offset_id: number): Promise<MessageDataObject[]> { return query('SELECT * FROM messages WHERE channel_id = ? AND id > ? ODER BY id ASC LIMIT ?', [channel_id, offset_id, amount ]) },

    create_message(author_id: number, content: string, reference_id: number | null, channel_id: number) { return query('INSERT INTO messages(content, channel_id, reference_id, author_id) VALUES ( ? )', [[content, channel_id, reference_id, author_id]]) },

    delete_message(message_id: number, channel_id: number) {
        return query('DELETE FROM messages WHERE id=? AND channel_id=?', [message_id, channel_id])
    },
    edit_message(message_id: number, content: string): Promise<void> {
        return query('UPDATE messages SET content=? WHERE id=?', [content, message_id])
    },
    create_attachment(id: number, message_id: number,  filename:string, size: number, type: string) {
        return query("INSERT INTO attachments(id, filename, size, type, message_id) VALUES(?)", [[id, filename, size, type, message_id]])
    },
    get_attachment(attachment_id: number) {
        return query("SELECT filename, size, type FROM attachments WHERE id=? LIMIT 1",[attachment_id])
    },
    get_message_attachments(message_id: number) {
        return query("SELECT id, filename, size, type FROM attachments WHERE message_id = ?", [message_id])
    },
    create(name: string, community_id: number){
        return query('INSERT INTO channels VALUES(NULL, ?, ?)', [name, community_id])
    },
}