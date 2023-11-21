import { userModel } from "@/db/users";
import { newBot } from "../telegram";
import { userNormalize } from "@/helpers/user/normalize";
import { bcryptService } from "../bcrypt";
import { userExist } from "@/helpers/user/exist";

export const register = async (email: string, password: string) => {
    const existUser = await userExist(email);

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
    ]).then(() => {
        console.log('all promises returned');
        
    }).catch((e) => {
        console.log(e);
    });

    const user = userNormalize(newUser);

    return user;

}

export const registerService = {
    register
}
