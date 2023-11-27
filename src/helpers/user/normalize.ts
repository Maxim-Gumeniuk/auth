import { Roles } from "@/types/roles";

export const userNormalize = (
    { email, role, _id, name }
    : {email: string, role: Roles, _id: string, name: string}) => ({
    email, role, _id, name
})
