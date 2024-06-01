import { Router } from 'express';
const upload = require('../multer').uploadAttachment;
import { get_posts, create_post } from '../controllers/posts';
import { check_perms } from '../middleware/auth';
import { catch_errors } from '../middleware/error';

const router = Router({ mergeParams: true });

router.get('/', catch_errors(get_posts))
router.post('/', upload.array('files', 20), catch_errors(create_post))

export const postsRouter = router;
