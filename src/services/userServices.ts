import bcrypt from 'bcrypt';
import userSchema from '../models/Users';


class UserServices {
    public async createUser(user:any) {
        const { password } = user;
        const hashedPassword = await this._hashPassword(password);
        const dataSave = { ...user, password: hashedPassword };
        return dataSave;
    }

    public async getUserByEmail(email:any) {
        const user = await userSchema.findOne({login:email})
        return user;
    }

    public async getUsersByRole(payload:any,role:string) {
        if(role == 'Admin'){
            const users = await userSchema.find({})
            return users
        }else if(role == "Boss"){
            const {login} = payload;
            const user = await userSchema.find({login})
            const subordinates = await userSchema.find({login: { "$in" : user[0].subordinates} })
            return{
                boss:user[0],
                subordinates: subordinates
            }
        }
    }

    public async compareUserPassword(password:string, hashedPassword:string):Promise<boolean> {
        const isPasswordCorect = await bcrypt.compare(password, hashedPassword);
        return isPasswordCorect;
    }

    private async _hashPassword(password:string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserServices();