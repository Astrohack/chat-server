import { Router } from 'express';
const upload = require('../multer').uploadAttachment;
import { getMessages, createMessage, editMessage, deleteMessage } from '../controllers/message';
import { check_perms } from '../middleware/auth';
import { catch_errors } from '../middleware/error';

const router = Router({ mergeParams: true });

router.get('/', catch_errors(getMessages))
router.post('/', upload.array('files', 20), catch_errors(createMessage))
//router.post('/:message_id/ack', catch_errors(acknowledge))
router.patch('/:message_id',  catch_errors(editMessage))
router.delete('/:message_id',  catch_errors(deleteMessage))

export const messageRouter = router;
