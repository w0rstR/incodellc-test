import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IRequestExtended extends Request{
    user?: string,
    userId?:number,
    tokenPayload?: JwtPayload | ITokenPayload
}

export interface ITokenPayload{
    login: string,
    role: string,
    iat: string,
    exp: string
}