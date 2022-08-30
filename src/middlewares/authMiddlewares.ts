import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces/requestExtendedInterface';
import userSchema from '../models/Users';
class AuthMiddlewares {
    public async checkLogin(req:IRequestExtended, res:Response, next:NextFunction) {
        const {login} = req.body;

        const user = await userSchema.findOne({login})
        
        if(user){
            res.status(404).json('User with this login already exists')
                return
        }
        
        next();
    }
}

export const authMiddlewares = new AuthMiddlewares();