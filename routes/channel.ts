import { Router } from 'express';
import * as channelRoute from '../controllers/channel';
import{ messageRouter } from '@/routes';
import { catch_errors } from '../middleware/error';
import { grab_params } from '../middleware/params';

const router = Router({ mergeParams: true })

router.use('/:channel_id/messages', grab_params, messageRouter)

router.post('/:channel_id/typing', grab_params, channelRoute.triggerTyping)

export const channelRouter = router;
