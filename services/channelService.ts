import UserDB from '../models/account';
import ChannelDB from '../models/channel';
const { NotFoundError, BadRequestError } = require('../lib/errors');
import { Attachment, File, Message, MessageDataObject, User as UserType } from "@/lib/types";

export default {

    create_message: async function (channel_id: number, author_id: number, reference_id: number | null, content = "", files: Array<File>) {
        const { insertId } = await ChannelDB.create_message(author_id, content, reference_id, channel_id);
        if (files) {
            for (var file of files) {
                await ChannelDB.create_attachment(parseInt(file.filename), insertId, file.originalname, file.size, file.mimetype);
            }
        }
        return insertId
    },

    edit_message: async function (message_id: number, content: string) {
        await ChannelDB.edit_message(message_id, content)
    },

    delete_message: async function (message_id: number, channel_id: number) {
        await ChannelDB.delete_message(message_id, channel_id)
    },

    get_messages: async function (channel_id: number, limit: number | null, last: number | null) {
        var messages: MessageDataObject[], cache = {};

        if (last) messages = await ChannelDB.get_messages_before(channel_id, limit = 50, last);
        else messages = await ChannelDB.get_messages(channel_id, limit = 50);

        async function user_cache(user_id: number): Promise<UserType> {
            if (user_id in cache) return cache[user_id]
            const user = await UserDB.profile(user_id)
            return cache[user.id] = user
        }

        return await Promise.all(messages.map(async message => {
            const user = await user_cache(message.author_id)
            const attachments = await this.get_message_attachments(message.id);
            const reference = message.reference_id ? await this.get_message(message.reference_id) : null;

            return {
                id: message.id,
                content: message.content,
                user,
                created: message.created,
                channel_id: message.channel_id,
                reference,
                attachments,
            } as Message
        }))
    },

    get_message: async function (message_id: number): Promise<Message | null> {
        const message = await ChannelDB.get_message(message_id)
        if (!message) return null;
        const user = await UserDB.profile(message.author_id);
        const attachments = await this.get_message_attachments(message.id);
        const reference = message.reference_id ? await this.get_message(message.reference_id) : null;

        return {
            id: message.id,
            content: message.content,
            user,
            created: message.created,
            channel_id: message.channel_id,
            reference,
            attachments,
        } as Message
    },

    set_acknowledge: async function (message_id: number, channel_id: number, user_id: number) {
        // await ChannelDB.set_acknowledge(message_id, channel_id, user_id)
    },


    /*open_DM: async function(user_id: number, recipient_id: number) {
        if(user_id === recipient_id ) throw new BadRequestError("you cant create DM with yourself")
        const [channel] = await Channel.find_DM_between(user_id, recipient_id)
        if(channel) return channel
        const recipient = await User.basic_info(recipient_id)
        if(!recipient) throw new BadRequestError(`User with id ${recipient_id} does not exists`)
        const {insertId} = await Channel.create(null)
        await Channel.add_DM_members([user_id, recipient_id], insertId)
        const [new_channel] =  await Channel.get_basic_info(insertId)
        return new_channel
    },*/

    get_attachment: async function (attachment_id: number) {
        try {
            const attachment = await ChannelDB.get_attachment(attachment_id);
            return attachment
        } catch (error) {
            throw new NotFoundError("file does not exist")
        }
    },

    get_message_attachments: async function (message_id: number) {
        return ChannelDB.get_message_attachments(message_id)
    }
}
