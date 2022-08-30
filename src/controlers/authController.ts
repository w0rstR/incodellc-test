//import Users from '../models/Users'
import { NextFunction, Request, Response } from 'express';
import { IRequestExtended } from '../interfaces/requestExtendedInterface';
import { IUser } from '../interfaces/userInterface';
import {authService} from '../services/authServices'
import { tokenService } from '../services/tokenService';
import { userService } from '../services/userServices';
class AuthController {
    public async registration(req:Request, res:Response) {
       const data = await authService.registaration(req.body);

        res.cookie(
            'accessToken',
            data.token,
            { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true },
        );

        return res.json(req.body);
    }

    public async logout(req:IRequestExtended, res:Response) {
        const foundUserByToken = tokenService.identifyUserByToken(req.cookies.accessToken)
        
        if(!foundUserByToken){
            res.status(404).json('You are not logged in')
                return
        }

        res.clearCookie('accessToken');
        

        res.json({
            status: 'Logout successfully'
        });


    }

    public async login(req:Request, res:Response, next:NextFunction) {
        try {
            res.clearCookie('accessToken');
            const { password, login } = req.body;
            
            const emailExits:IUser | any = await userService.getUserByEmail(login)

            if(!emailExits){
                res.status(404).json('Wrong User')
                return
            }
            
            const isCorectPassword = await userService.compareUserPassword(password,emailExits.password);
            
            if(!isCorectPassword){
                res.status(404).json('Wrong User')
                return;
            }

            res.cookie(
                'accessToken',
                emailExits.token,
                { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true },
            );
            
            res.json({
                status: 'Login successfully'
            });
        } catch (e) {
            next(e);
        }
    }
    public async change(req:Request, res:Response, next:NextFunction) {
        try {
            res.cookie('accessToken','')
            const { password, login } = req.body;
            
            const emailExits:IUser | any = await userService.getUserByEmail(login)

            if(!emailExits){
                res.status(404).json('Wrong User')
                return
            }
            
            const isCorectPassword = await userService.compareUserPassword(password,emailExits.password);
            
            if(!isCorectPassword){
                res.status(404).json('Wrong User')
                return;
            }

            res.cookie(
                'accessToken',
                emailExits.token,
                { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true },
            );
            
            res.json({
                status: 'Login successfully'
            });
        } catch (e) {
            next(e);
        }
    }

}

export const authController = new AuthController();