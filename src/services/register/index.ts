import { userModel } from "@/db/users";
import { newBot } from "../telegram";
import { userNormalize } from "@/helpers/user/normalize";
import { getUserByEmail } from "@/helpers/user/getUserByEmail";
import { bcryptService } from "../bcrypt";

export const register = async (email: string, password: string) => {
    const existUser = await getUserByEmail(email);

    if (existUser) {
        return;
    } 

    const hashedPass = await bcryptService.makeHashPass(password);

    const newUser = new userModel({
        email,
        password: hashedPass,
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
