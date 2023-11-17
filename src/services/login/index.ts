import { userModel } from "@/db/users"

const getUserByEmail = ( email: string) => {
    const user = userModel.findOne({ email })

    return user;
}


export const loginService = {
    getUserByEmail,
}
