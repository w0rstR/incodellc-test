import jwt from 'jsonwebtoken';
import userSchema from '../models/Users';
import { userService } from './userServices';

const {TOKEN_SECRET_KEY} = process.env;

class AuthServices {
    public async registaration(body: any){
        const createdUser = await userService.createUser(body);
        const generatedToken =  await this._getTokenData(createdUser);
        const storedUser = new userSchema({...createdUser,...generatedToken})
        storedUser.save();
        return storedUser;
    }

    private async _getTokenData(userData:any) {
        const { login, role } = userData;
        const token  = await jwt.sign({login,role}, `${TOKEN_SECRET_KEY}`, { expiresIn: '500m' });
        return {
            token
        };
    }


}

export const authService = new AuthServices();