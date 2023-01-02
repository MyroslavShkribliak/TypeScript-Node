import { EmailEnum } from './email.enum';

export const emailInfo = {
  [EmailEnum.WELCOME]: {
    subject: 'Welcome to SEP-2021',
    templateName: 'welcome'
  },

  [EmailEnum.FORGOT_PASS]: {
    subject: 'You account was blocked',
    templateName: 'accountBlocked'
  }
};
