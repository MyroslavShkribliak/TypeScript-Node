import { Router } from 'express';

import { authController } from '../controller';
import { userMiddleware, authMiddleware } from '../middleware';

const router = Router();

router.post('/login', authMiddleware.isBodyValid, userMiddleware.getUserDynamically('email'), authController.login);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);

export const authRouter = router;
