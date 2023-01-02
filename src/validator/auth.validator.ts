import Joi  from 'joi';

import { RegExpEnum } from '../constants';

export const authValidator = {
  Login: Joi.object({
    email: Joi.string()
      .regex(RegExpEnum.EMAIL)
      .lowercase()
      .trim()
      .required(),
    password: Joi.string()
      .regex(RegExpEnum.PASSWORD)
      .max(25)
      .required()
  })

};

