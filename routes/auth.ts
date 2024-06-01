const router = require('express').Router({ mergeParams: true });
const authRoute = require('../controllers/auth');
const { catch_errors } = require('../middleware/error');


router.post('/register', catch_errors(authRoute.register))
router.post('/login', catch_errors(authRoute.login))

export const authRouter = router
