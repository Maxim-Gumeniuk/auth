import { ENVVARIABLES } from "@/env-variables"
import { Db } from "@/constructors/usersDb.ts";
import { Roles } from "@/types/roles";
import mongoose from "mongoose";

const { MONGOSTRING } = ENVVARIABLES;

const userSchema = {
    email: { 
        type: String, 
        unique: true, 
        required: true,
        description: 'it`s should be unique address'
    },
    password: {
        type: String,
        required: true,
        min: [8, "password should contains min 8 characters"],
    },
    activateToken: {
        type: String,
    },
    role: {
        type: String,
        enum: Object.values(Roles),
        default: Roles.USER,
    },    
}

export const usersDb = new Db(MONGOSTRING!);

export const connectUsersDb = async () => {
    try {
        await usersDb.connect();

        console.log("Connected to the database");

    } catch (e) {
        console.log(e);
    }
}

usersDb.createSchema(userSchema);

export const userModel = usersDb.createModel('users', userSchema);
