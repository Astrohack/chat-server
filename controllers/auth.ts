import * as UserService from '@/services/accountService';
import { generate_access_token, generate_id } from '@/lib/helper';
import { z } from 'zod'
import config from '../config';
import { Response } from 'express';


export const register = async function({
    body: {
        email, 
        password,
        username
    }}, res: Response) {
    const user_id = generate_id();
    await UserService.create(user_id, email, username, password)
    const token = generate_access_token(user_id)
    res.json({token, expires_in: config.tokenExpirity});
}

export const login = async function({
    body: {
        email,
        password
    }
}, res: Response) {
    const user_id = await UserService.authenticate(email, password);
    const token = generate_access_token(user_id)
    res.json({token, expires_in: config.tokenExpirity});
}


