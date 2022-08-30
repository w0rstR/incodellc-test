import { Router } from 'express';
import  {authController}  from '../controlers/authController';
import { authMiddlewares } from '../middlewares/authMiddlewares';

const router = Router();

export const authRouter = router;

router.post('/registration',authMiddlewares.checkLogin,authController.registration);
router.post('/login', authController.login);
router.get('/logout',  authController.logout);
