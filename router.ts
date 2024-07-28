import express from 'express';
import cors from 'cors';

import { catch_errors, handle_exception_middleware } from '@/middleware/error';
import { authenticate } from '@/middleware/auth';

import {
    channelRouter,
    postsRouter,
    userRouter,
    authRouter
 } from '@/routes'

import Channel from '@/services/channelService';
import config from '@/config';
import logger from '@/utils/logger';

const init = () => {
    const app = express();

    app.use(express.urlencoded({
        extended: true
    }));

    app.use(cors())
    
    app.use(express.json())

    app.use('/', authRouter);

    app.use('/avatars', express.static('avatars'))

    // TODO: Move functionality to seperate sever
    app.get('/attachments/:id', async function ({ params: { id }}, res) {
        try {
            const {filename, type} = await Channel.get_attachment(parseInt(id))
            res.setHeader('Content-type', type);
            res.download(`uploads/${id}`, filename.toString());
        } catch (error) {
            res.status(404).send(error)
        }
    })

    app.use('/', authenticate);

    app.use('/channels',  channelRouter);

    app.use('/users/', userRouter);

    app.use('/posts/', postsRouter);

    app.use(handle_exception_middleware)

    app.listen(config.apiPort, config.host, () => {
        logger.info("api is running on port " + config.apiPort)
    })
}

export { init }