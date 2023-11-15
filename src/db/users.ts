import { ENVVARIABLES } from "@/env-variables"
import { DB } from "@/constructors/usersDb.ts";

const { MONGOSTRING } = ENVVARIABLES;

export const usersDb = new DB(MONGOSTRING!, {
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
})

export const connectUsersDb = async () => {
    try {
        await usersDb.connect();

        console.log("Connected to the database");

    } catch (e) {
        console.log(e);
    }
}

usersDb.createSchema();

export const userModel =  usersDb.createModel('users');
