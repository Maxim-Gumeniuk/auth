import { ENVVARIABLES } from '@/env-variables';
import jwt from 'jsonwebtoken';

const generateJwt = (user: any) => {
    try {
        return jwt.sign({ user, role: user.role}, ENVVARIABLES.JWT_SECRET_KEY!);
    } catch(e) {
        console.log(e);
    }
}

const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, ENVVARIABLES.JWT_SECRET_KEY!)
    } catch(e) {
        console.log(e);
        
    }   
}

export const jwtService = {
    generateJwt,
    verifyToken,
}
