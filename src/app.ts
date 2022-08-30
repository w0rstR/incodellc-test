import  'reflect-metadata';
import express from 'express';
import cookieParser from 'cookie-parser';
import { routes } from './routes/apiRouters';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(routes);


const {MONGO_URL} = process.env

app.listen(5500, async () => {
    try {
        await mongoose.connect(`${MONGO_URL}`)
    } catch (e) {
        console.log(e);
    }
    console.log('Server has started!!!');
});