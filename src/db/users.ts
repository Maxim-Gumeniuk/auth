import { ENVVARIABLES } from "@/env-variables"
import { DB } from "@/constructors/usersDb.ts";
import { emailValidations } from "@/helpers/credentials-validation";

const { MONGOSTRING } = ENVVARIABLES;

export const usersDb = new DB(MONGOSTRING!, {
    email: { 
        type: String, 
        unique : true, 
        required : true,
        validate: [emailValidations, 'it`s should be email address']
    },
    password: {
        type: String,
        required : true,
        min: [6, "password should contains min 6 characters"]
    }
});


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
