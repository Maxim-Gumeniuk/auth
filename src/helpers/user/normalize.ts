import { Roles } from "@/types/roles";

export const userNormalize = (
    { email, role, _id }
    : {email: string, role: Roles, _id: string}) => ({
    email, role, _id
})
