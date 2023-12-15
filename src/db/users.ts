import { Roles } from "@/types/roles";
import { usersDb } from "./connection";


const userSchema = {
    name: {
        type: String, 
        required: true,
        min: [2, "it should be real name"],
    },
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

usersDb.createSchema(userSchema);

export const userModel = usersDb.createModel('users', userSchema);
