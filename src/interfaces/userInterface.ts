export interface IUser{
    _id: any
    name: string,
    login: string
    password: string
    role: string,
    subordinates: [],
    token: string,
    __v: number
}