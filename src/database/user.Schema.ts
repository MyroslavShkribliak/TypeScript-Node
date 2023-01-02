import { Schema, model, Document } from 'mongoose';

import { IUser } from '../model';

export type UserType = IUser & Document;


const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, trim: true, lowercase: true, unique: true , required: true},
  password: { type: String, required: true }
}, {
  timestamps: true
});

export const User = model<UserType>('User', userSchema);
