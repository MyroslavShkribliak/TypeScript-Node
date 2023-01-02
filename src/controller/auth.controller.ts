import { NextFunction, Response } from 'express';

import { authService, emailService } from '../service';
import { IRequestExtended } from '../model';
import { oauthSchema } from '../database';
import { EmailEnum } from '../constants';

class AuthController {
  public async login(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {
        user,
        body
      } = req;

      await emailService.sendMail(String(user?.email), EmailEnum.WELCOME, { userName: String(user?.name) });

      await authService.comparePassword(String(user?.password), body?.password);

      const tokenGenerateUser = authService.generateToken({ id: user?._id });

      console.log(tokenGenerateUser);

      await oauthSchema.create({
        ...tokenGenerateUser,
        _user_id: user?._id
      });

      res.json({
        user,
        ...tokenGenerateUser
      });

    } catch (e) {
      next(e);
    }
  }

  public async refresh(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {
        refreshToken,
        _user_id
      } = req.params;

      await oauthSchema.deleteOne({ refreshToken });

      const tokenPair = authService.generateToken({ id: _user_id });
      console.log(tokenPair);
      await oauthSchema.create({
        ...tokenPair,
        _user_id
      });

      res.status(201)
        .json(tokenPair);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
