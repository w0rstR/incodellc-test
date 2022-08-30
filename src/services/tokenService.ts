import jwt from 'jsonwebtoken';
import userSchema from '../models/Users';

const {TOKEN_SECRET_KEY} = process.env

class TokenServices {
    public async identifyUserByToken(token: string){
        const userByToken = await userSchema.findOne({token}) 
        return userByToken;
    }

    public async identifyRoleByToken(token: string){
        try{
            const payload =  await jwt.verify(token,`${TOKEN_SECRET_KEY}`)
            return payload
        }catch{
            return null
        }
    }
    
}

export const tokenService = new TokenServices();