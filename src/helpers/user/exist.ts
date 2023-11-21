import { userModel } from "@/db/users"

export const userExist = (email: string) => {
    return userModel.exists({email});
}