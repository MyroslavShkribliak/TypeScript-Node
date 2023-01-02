import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { config } from '../config/config';
import { tokenTypeEnum } from '../constants/token-type.enum';
import { IUserPayload } from '../model';

class AuthService {
  public _hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public async comparePassword(hashPassword: string, password: string): Promise<void | Error> {
    const isPasswordsSame = await bcrypt.compare(password, hashPassword);

    if (!isPasswordsSame) {
      return Error('status 400');
    }
  }

  public async generateToken(payload = {}): Promise<{accessToken: string, refreshToken: string}> {
    const accessToken = jwt.sign(payload, config['ACCESS_TOKEN'] as string, { expiresIn: '1d' });
    const refreshToken = jwt.sign(payload, config['REFRESH_TOKEN'] as string, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken
    };
  }

  verifyToken(token: string, TokenType = tokenTypeEnum.accessToken) {
    try {
      let secret: string | undefined = '';

      if (TokenType === tokenTypeEnum.accessToken) secret = config.ACCESS_TOKEN;
      else if (TokenType === tokenTypeEnum.refreshToken) secret = config.REFRESH_TOKEN;

      return jwt.verify(token, secret as string) as IUserPayload;
    }catch (e) {
      console.error(e);
    }
  }
}

export const authService = new AuthService();
