import { userModel } from "@/db/users";
import { getUserByEmail } from "@/helpers/user/getUserByEmail"
import { newBot } from "../telegram";
import { userNormalize } from "@/helpers/user/normalize";

export const register = async (email: string, password: string) => {
    const existUser = await getUserByEmail(email);

    if (existUser) {
        return;
    } 

    const newUser = new userModel({
        email,
        password,
    })

    await Promise.all([ 
        newBot(),  
        newUser.save()
    ]);

    const user = userNormalize(newUser);

    return user;

}

export const registerService = {
    register
}
