import { JWT_KEY } from '@/consts';
import { SignJWT, jwtVerify } from 'jose';

export const generateToken = async (email: string): Promise<string> => {
    const jwt = await new SignJWT({ email })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(new TextEncoder().encode(JWT_KEY));
    return jwt;
};

export const verifyToken = async (token: string): Promise<boolean> => {
    try {
        await jwtVerify(token, new TextEncoder().encode(JWT_KEY));
        return true;
    } catch {
        return false;
    }
};
