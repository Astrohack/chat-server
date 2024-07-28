import user_model from '@/models/account';
import path from 'path'
import sharp from 'sharp';
import bcrypt from 'bcrypt';
import { BadRequestError, UnauthorizedError } from '../lib/errors';
import { File, UserEditOptions, User as UserType } from '@/lib/types';

/**
 * Fetch all data to feed frontend startup
 * @deprecated
 */
export async function full(user_id: number) {
    return {
        private_channels: await this.channels_with_unread(user_id),
        communities: [],
        user: await this.user_details(user_id)
    }
}

/**
 * Verify if credentials are valid.
 * 
 * Compare stored in database hashed password with given
 * @param {string} email
 * @param {string} password 
 * @throws {UnauthorizedError} If email does not exists
 * @throws {DatabaseObjectNotFoundException} If email does not exists in database
 * @returns User id
 */
export async function authenticate(email: string, password: string) {
    const {id, hash} = await user_model.get_password_by_email(email)
    if (!await bcrypt.compare(password, hash)) throw new UnauthorizedError('Incorrect password');
    return id
}

/**
 * Create new user in system.
 * @param {string} user_id user id
 * @param {string} email user email
 * @param {string} username user nick
 * @param {string} password user password
 * @throws {BadRequestError} email already exists
 * @returns {Promise<void>} resolves when user is created
 */
export async function create(user_id: string, email: string, username: string, password: string) {

    const exists = await user_model.exists_email(email);
    if (exists) throw new BadRequestError('user with this email already exists');

    const hashed_password = await bcrypt.hash(password, 10)
    user_model.create(user_id, email, username, hashed_password)
}

/**
 * Remove account from database. For test purposes only
 * @param {string} user_id
 * @returns Resolves when user is destroyed
 */
export async function destroy(user_id: string) {
    return user_model.delete(user_id)
}

/**
 * Set new avatar for user
 * @param {string} user_id
 * @param {*} file
 * @returns Resolves with id of created avatar on avatar successful change
 */
export async function set_avatar(user_id: string, file) {
    const filename = Date.now().toString() + path.extname(file.originalname)
    await sharp(file.buffer)
        .resize(170, 170, {
            fit: 'cover',
            position: 'centre'
        })
        .png()
        .toFile(`avatars/${filename}`)
    await user_model.set_avatar(user_id, filename)
    return filename
}

/**
 * Fetch profile info about account
 *
 * @param {string} user_id user id
 * @returns  {Promise<UserType>} Resolves with profile object when data is fetched succesfuly 
 */
export function profile(user_id: string): Promise<UserType> {
    return user_model.profile(user_id)
}

/**
 * Change account password
 * @param {string} user_id
 * @param {string} newPassword
 * @returns Resolves when password is changed
 */
export function chnage_password(user_id: string, newPassword: string){
    return user_model.change_password(user_id, newPassword);
}

/*export function edit(user_id: string, settings: UserEditOptions) {
    return user_model.edit(user_id, settings)
}*/

export const edit = user_model.edit