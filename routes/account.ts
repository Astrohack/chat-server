const router = require('express').Router({ mergeParams: true });
const accountRoute = require('../controllers/account');
const { catch_errors } = require('../middleware/error');
const upload = require('../multer').uploadAvatar;

//router.get('/me/channels', catch_errors(accountRoute.get_channels))
router.get('/me/communities', catch_errors(accountRoute.get_communities))
router.get('/me', catch_errors(accountRoute.profile))
router.post('/avatar', upload.single('file'), accountRoute.set_avatar)


export const userRouter = router