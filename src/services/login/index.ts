import { userModel } from "@/db/users"

const findUserByEmail = ( email: string) => {
    const user = userModel.findOne({ email })

    console.log(user);

    return user;
}


export const loginService = {
    findUserByEmail,
}
