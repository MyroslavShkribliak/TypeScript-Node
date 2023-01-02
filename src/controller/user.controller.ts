import { Request, Response, NextFunction } from 'express';

import { userService, authService } from '../service';

class UserController {
  public async getAllUser(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll({});

      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getById();

      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { password } = req.body;

      // await emailService.sendEmail('muroslav260@gmail.com', EmailEnum.FORGOT_PASS,);

      const hashPassword = await authService._hashPassword(password);

      const result = await userService.create({
        ...req.body,
        password: hashPassword
      });

      res.status(201)
        .json(result);
    } catch (e) {
      next(e);
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const { userId } = req.params;

      await userService.updateUser(userId, body);

      res.status(201)
        .json('ok');
    } catch (e) {
      next(e);
    }

  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const user = await userService.deleteUser(userId);

      res.status(201)
        .json(user);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
