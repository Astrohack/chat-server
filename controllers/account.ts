import { BadRequestError } from '@/lib/errors';
import * as userService from '@/services/accountService';
import { Response } from 'express';


export async function profile({ user_id }, res: Response) {

    const profile = await userService.profile(user_id)
    res.send(profile)
}

export async function set_avatar({
    user_id,
    file
}: any, res: Response) {
    if (!file) throw new BadRequestError("missing multipart image tagged 'file'")
    const filename = await userService.set_avatar(user_id, file)
    res.send()
}

export async function edit({
    user_id,
    body: {
        settings
    }
}, res: Response) {
    await userService.edit(user_id, settings)
    res.send()
}
