import { Router } from 'express';

import { userController } from '../controlers/userContorller';
import { userMiddlewares } from '../middlewares/userMiddlewares';


const router = Router();

export const userRouter = router;

router.get('/getAllUsers',userMiddlewares.сheckRole,userController.getUsers);
router.post('/change',userController.change)

