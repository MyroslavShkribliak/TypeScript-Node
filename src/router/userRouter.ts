import { Router } from 'express';

import { userController } from '../controller';
import { authMiddleware, userMiddleware } from '../middleware';

const router = Router();

router.get('/', userController.getAllUser);
router.post('/', userMiddleware.isNewUserValid ,userMiddleware.checkIsEmailUnique, userController.create);

router.get(
  '/:userId',
  userMiddleware.isUserIdValid,
  authMiddleware.checkAccessToken,
  userMiddleware.getUserDynamically('userId', 'params', '_id'),
  userController.getById
);
router.put(
  '/:userId',
  userMiddleware.isUserIdValid,
  userMiddleware.isEditUserValid,
  authMiddleware.checkAccessToken,
  userMiddleware.getUserDynamically('userId', 'params', '_id'),
  userController.updateUser
);

router.delete(
  '/:userId',
  userMiddleware.isUserIdValid,
  authMiddleware.checkAccessToken,
  userController.deleteUser
);
export const userRouter = router;
