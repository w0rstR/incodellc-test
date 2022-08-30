import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces/requestExtendedInterface';
import userSchema from '../models/Users';
import { tokenService } from '../services/tokenService';
class UserMiddlewares {
    public async сheckRole(req:IRequestExtended, res:Response, next:NextFunction) {
        try{
            const tokenPayload = await tokenService.identifyRoleByToken(req.cookies.accessToken) 
        
            if(!tokenPayload){
                res.status(404).json('wrong-token')
                return
            }

            if(typeof(tokenPayload) == 'string'){
                res.status(404).json('wrong-token')
                return
            }

            if(tokenPayload.role == 'User'){
                res.status(404).json('You do not have access!')
                return
            }

            req.tokenPayload = tokenPayload;
            next();            

        }catch(e){
            res.status(404).json('Wrong Token')
                    return 
        }
        

    }
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

export const userMiddlewares = new UserMiddlewares();