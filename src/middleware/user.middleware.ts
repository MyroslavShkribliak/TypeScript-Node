import { Response, NextFunction } from 'express';

import { userService } from '../service';
import { IRequestExtended } from '../model';
import { commonValidator, userValidator } from '../validator';

class UserMiddleware {
  public getUserDynamically(fieldName: string, from = 'body', dbField = fieldName) {
    return async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
      try {
        const fieldToSearch = req[from as keyof typeof req][fieldName];

        const user = await userService.getById({ [dbField]: fieldToSearch });

        if (!user) {
          return next();
        }

        req.user = user;
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public async checkIsEmailUnique(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        return next();
      }

      const user = await userService.getById({ email });

      if (!user) {
        return next();
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isEditUserValid(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { error, value } = await userValidator.editUserValidator.validate(req.body);

      if (error){
        return next();
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isNewUserValid(req: IRequestExtended, res: Response, next: NextFunction) {
    try {

      const { error, value } = await userValidator.newUserValidator.validate(req.body);

      if (error){
        return next();
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isUserIdValid(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { error } = await commonValidator.idValidator.validate(userId);

      if (error){
        return next();
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
