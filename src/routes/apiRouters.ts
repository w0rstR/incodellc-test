import { Router } from 'express';
import { authRouter } from './authRouter';
import { userRouter } from './userRouter';

export const routes = Router();


// routes.use('/posts', postRouter);
// routes.use('/comments', commentRouter);
routes.use('/auth', authRouter);
routes.use('/users', userRouter)
// @ts-ignore
routes.use('*', (err, req, res, next) => {
    res.status(err.status || 500)
        .json({ message: err.message });
});