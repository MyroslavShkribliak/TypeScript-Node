import { Response, NextFunction } from 'express';

import { authService } from '../service';
import { oauthSchema } from '../database';
import { constants } from '../constants';
import { IRequestExtended } from '../model';
import { authValidator } from '../validator';

class AuthMiddleware {
  public async isBodyValid(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { error, value } = await authValidator.Login.validate(req.body);

      if (error) {
        return next();
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const accessToken = req.get(constants.AUTHORIZATION);

      if (!accessToken) {
        return next();
      }
      authService.verifyToken(accessToken);

      const tokenInfo = await oauthSchema.findOne({ accessToken });

      if (!tokenInfo) {
        return next();
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.get(constants.AUTHORIZATION);

      if (!refreshToken) {
        return next();
      }
      authService.verifyToken(refreshToken);

      const tokenInfo = await oauthSchema.findOne({ refreshToken });

      if (!tokenInfo) {
        return next();
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
