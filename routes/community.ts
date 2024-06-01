import { Router } from 'express';
import { get_channels } from '../controllers/community';
import { catch_errors } from '../middleware/error';
import { grab_params } from '../middleware/params';

const router = Router();
router.get('/:community_id/channels', grab_params, catch_errors(get_channels))

export const communityRouter = router;