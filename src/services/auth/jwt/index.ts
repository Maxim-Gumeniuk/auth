import jwt from 'jsonwebtoken';

import { RefreshToken } from '@/db/refresh';
import { ENVVARIABLES } from '@/env-variables';

const generateJwt = (user: any) => {
    try {
        return jwt.sign({ user, role: user.role }, ENVVARIABLES.JWT_SECRET_KEY!, { expiresIn: '1h'});
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

const save = async (userId: string, refreshToken: string) => {
    const token = await RefreshToken.findOne({ userId });
    
    if (!token) {
        await RefreshToken.create({ userId, refreshToken });

        return;
    }

    token.refreshToken = refreshToken;

    token.save()
}

const getByToken = (refreshToken: string) => {
    return RefreshToken.findOne({ refreshToken });
}

export const jwtService = {
    generateJwt,
    verifyToken,
    generateRefreshJwt,
    verifyRefreshToken,
    save,
    getByToken
}
