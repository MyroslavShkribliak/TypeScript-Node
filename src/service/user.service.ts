import { User } from '../database';
import { IUser } from '../model';

class UserService {
  public getAll(filter: Partial<IUser>) {
    return User.find(filter);
  }

  public getById(filter?: Partial<IUser>) {
    return User.findOne(filter)
      .exec();
  }

  public create(user: IUser) {
    const userToSave = new User(user);

    return userToSave.save();
  }

  public updateUser(userId: string, newInfo: Partial<IUser>) {
    return User.findByIdAndUpdate(userId, newInfo, { new: true })
      .exec();
  }

  public deleteUser(userId: string) {
    return User.deleteOne({ _id: userId });
  }
}

export const userService = new UserService();
