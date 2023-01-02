import * as Joi from 'joi';

import { RegExpEnum } from '../constants';

export const userValidator = {
  newUserValidator: Joi.object({
    name: Joi.string().min(2).max(100).required().default(''),
    email: Joi.string().regex(RegExpEnum.EMAIL).lowercase().trim().required(),
    password: Joi.string().regex(RegExpEnum.PASSWORD).required(),
    age: Joi.number().integer().min(1).max(120)
  }),

  editUserValidator: Joi.object({
    name: Joi.string().min(2).max(100).default('').optional(),
    email: Joi.string().regex(RegExpEnum.EMAIL).lowercase().trim().optional(),
    age: Joi.number().integer().min(1).max(120).optional()
  }),
};
