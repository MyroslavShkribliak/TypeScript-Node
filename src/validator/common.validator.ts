import Joi from 'joi';

import { RegExpEnum } from '../constants';

export const commonValidator = {
  idValidator: Joi.string().regex(RegExpEnum.MONGO_ID)
};


