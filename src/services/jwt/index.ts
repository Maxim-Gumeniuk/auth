import { ENVVARIABLES } from '@/env-variables';
import jwt from 'jsonwebtoken';

const generateJwt = (user: any) => {
    try {
        return jwt.sign({ user, role: user.role}, ENVVARIABLES.JWT_SECRET_KEY!, { expiresIn: '1h'});
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
const generateRefreshJwt = (user: any) => {
    try {
        return jwt.sign({ user, role: user.role}, ENVVARIABLES.JWT_SECRET_REFRESH_KEY!, { expiresIn: '1m'});
    } catch(e) {
        console.log(e);
    }
}

const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, ENVVARIABLES.JWT_SECRET_REFRESH_KEY!)
    } catch(e) {
        console.log(e);
        
    }   
}

export const jwtService = {
    generateJwt,
    verifyToken,
    generateRefreshJwt,
    verifyRefreshToken
}
