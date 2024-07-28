import Channel from '../services/channelService'
import { NotFoundError, BadRequestError } from '../lib/errors'

export async function getMessages({
    channel_id,
    query: {
        limit,
        last
    }
}, res) {
    const messages = await Channel.get_messages(parseInt(channel_id), parseInt(limit) || 50, parseInt(last))
    res.send(messages)
}

export async function createMessage({
    files,
    body: {
        content,
        reference_id
    },
    user_id,
    channel_id
}, res) {
    if (!content && files.length === 0 ) throw new BadRequestError("Missing content or file");
    const message_id = await Channel.create_message(parseInt(channel_id), parseInt(user_id), reference_id, content, files);
    const message = await Channel.get_message(message_id);
    res.send();
    /*const community_id = await communityService.get_by_channel_id(channel_id)
    Gateway.send("community." + community_id, "MESSAGE_CREATE", message);*/   
}

export async function editMessage({
    body: {
        content
    },
    params: {
        message_id
    },
    channel_id,
}, res) {
    if (!message_id || !content) throw new BadRequestError("Missing parameters")
    const timestamp  = await Channel.edit_message(message_id, content)
    /*const community_id = await communityService.get_by_channel_id(channel_id)
    Gateway.send("community."  + community_id, "MESSAGE_EDIT", {
        id: parseInt(message_id),
        content: content,
        timestamp: timestamp,
        channel_id: parseInt(channel_id)
   })*/
   res.send()
}

export async function deleteMessage({
    params: {
        message_id
    },
    channel_id
}, res) {
    if (isNaN(message_id)) throw new BadRequestError("Incorrect message id")
    await Channel.delete_message(message_id, channel_id)
    /*const community_id = await communityService.get_by_channel_id(channel_id)
    Gateway.send("community." + community_id, "MESSAGE_DELETE", {
        id: parseInt(message_id),
        channel_id: parseInt(channel_id)
    })*/
    res.send()
}

export async function acknowledge({
    params: {
        message_id,
    },
    user_id,
    channel_id
}, res) {
    if(isNaN(message_id)) throw new BadRequestError("Incorrect message id")
    await Channel.set_acknowledge(message_id, channel_id, user_id)
    res.send()
}
