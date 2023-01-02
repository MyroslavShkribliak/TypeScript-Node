import { Schema, model, Document } from 'mongoose';

import { IAccessTokenInterface } from '../model';
import { TableNamesEnum } from '../constants';

export type AccessTokenType = IAccessTokenInterface & Document;

export const OAuthSchema = new Schema({
  _user_id: {
    type: Schema.Types.ObjectId,
    ref: TableNamesEnum.USER
  },
  accessToken: String,
  refreshToken: String
}, {
  timestamps: true,
  versionKey: false
});

export const oauthSchema = model<AccessTokenType>('OAuth_Schema', OAuthSchema);
