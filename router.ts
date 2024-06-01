import express from 'express';
import cors from 'cors';
import { handleAPIErrors } from '@/lib/errorHandlers';
import {
    channelRouter,
    postsRouter,
    userRouter,
    communityRouter,
    authRouter
 } from '@/routes'
import { authorize } from '@/middleware/auth';
import Channel from '@/services/channelService';
import config from '@/config';
const app = express();

app.use(express.urlencoded({
    extended: true
}));

/*app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    res.setHeader('Referrer-Policy', 'no-referrer');
    next()
})*/

app.use(cors()) 

app.use(express.json())

app.use('/', authRouter);

app.use('/avatars', express.static('avatars'))

app.get('/attachments/:id', async function ({ params: { id }}, res) {
    try {
        const {filename, type} = await Channel.get_attachment(parseInt(id))
        res.setHeader('Content-type', type);
        res.download(`uploads/${id}`, filename.toString());
    } catch (error) {
        res.status(404).send(error)
    }
})

app.use('/', authorize);

app.use('/channels',  channelRouter);

app.use('/users/', userRouter);

app.use('/community/', communityRouter);

app.use('/posts/', postsRouter);

app.use(handleAPIErrors)

app.listen(config.apiPort, config.host, () => {
    console.log("api is running on port " + config.apiPort)
})

export default app