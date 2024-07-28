import { Router } from 'express';
import * as accountRoute from '@/controllers/account';
import { catch_errors } from '../middleware/error';
import { uploadAvatar } from '@/multer';

const router = Router({ mergeParams: true });

router.get('/me', catch_errors(accountRoute.profile))

router.post('/me/avatar', uploadAvatar.single('file'), accountRoute.set_avatar)

export const userRouter = router