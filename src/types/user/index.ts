import { Roles } from "../roles";

export interface IUser {
    email: string;
    password: string;
    role: Roles;
    actavateToken?: string;
}
