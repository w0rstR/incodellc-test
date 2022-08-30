import { Schema, model } from "mongoose";

const Users = new Schema({
    name: {
        type: String
        
    },
    login:{
        type: String
        
    },
    password:{
        type: String,
        require: true
    },
    role:{
        type: String
        
    },
    subordinates:{
        type:Array
    },
    token:{
        type: String
    }
})

const userSchema = model('Users',Users)

export default userSchema;