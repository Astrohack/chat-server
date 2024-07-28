import { Router } from 'express';
import * as authRoute from '@/controllers/auth';
import { z } from 'zod';
import { validate } from '@/middleware/params';
const { catch_errors } = require('../middleware/error');

const router = Router({ mergeParams: true })

const registerSchema = z.object({
    email: z.string().email().max(50),
    username: z.string().min(3).max(30),
    password: z.string().min(3).max(30),
  });
router.post('/register', validate(registerSchema), catch_errors(authRoute.register))

const loginSchema = z.object({
    email: z.string().email().max(50),
    password: z.string().min(3).max(30),
  });
router.post('/login', validate(loginSchema), catch_errors(authRoute.login))

export const authRouter = router
