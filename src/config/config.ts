import dotenv from 'dotenv';

dotenv.config();
export const config = {
  PORT: process.env['PORT'] || 3000,
  MONGO_URL: process.env['MONGO_URL'],

  ACCESS_TOKEN: process.env['ACCESS_TOKEN'],
  REFRESH_TOKEN: process.env['REFRESH_TOKEN'],

  NO_REPLY_EMAIL: process.env['NO_REPLY_EMAIL'],
  NO_REPLY_EMAIL_PASSWORD: process.env['NO_REPLY_EMAIL_PASSWORD'],

};

