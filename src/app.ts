import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import { userRouter, authRouter } from './router';
import { config } from './config/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use('*', (err: any, req: Request, res: Response, next: NextFunction) => {

  res.status(err.status || 500)
    .json({
      message: err.message || 500,
      status: err.status || 500
    });
});

mongoose.set('strictQuery', false);

app.listen(config.PORT, async () => {
  await mongoose.connect(String(config.MONGO_URL));
  console.log(' Server start 5000');
});
