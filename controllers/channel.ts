import * as Channel from '@/services/channelService';
import User from '@/models/account';
import { BadRequestError } from '@/lib/errors';

// NOT IMPLEMENTED
export const triggerTyping = async function({channel_id, user_id}, res) {
    res.sendStatus(500)
}