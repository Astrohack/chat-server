import UserDB from '../models/account';
import ChannelDB from '../models/channel';
var path = require('path')
import sharp from 'sharp';
import bcrypt from 'bcrypt';
import { UnauthorizedError } from '../lib/errors';
import { Community, User as UserType } from '@/lib/types';

export async function full(user_id: number) {
    return {
        private_channels: await this.channels_with_unread(user_id),
        communities: [],
        user: await this.user_details(user_id)
    }
}
export async function authenticate(email: string, password: string){
    const {id, hash} = await UserDB.hash_by_email(email)
    if (await bcrypt.compare(password, hash)) throw new UnauthorizedError('Incorrect password');
    return id
}

export async function create(email: string, nick: string, password: string) {
    const hash = await bcrypt.hash(password, 10)
    return UserDB.create(email, nick, hash)
}
export async function set_avatar(user_id: string, file) {
    const filename = Date.now().toString() + path.extname(file.originalname)
    await sharp(file.buffer)
        .resize(170, 170, {
            fit: 'cover',
            position: 'centre'
        })
        .png()
        .toFile(`avatars/${filename}`)
    await UserDB.set_avatar(user_id, filename)
    return filename       
}
export function details(user_id: number): Promise<UserType> {
    return UserDB.details(user_id)
}

export function communities(user_id: number): Promise<Array<Community>> {
    return UserDB.get_communities(user_id)
}

export function community_ids(user_id: number): Promise<Array<number>> {
    return UserDB.get_community_ids(user_id)
}