import { userModel } from "@/db/users";

export const getUserByEmail = ( email: string) => {
    const user = userModel.findOne({ email })

    return user;
}