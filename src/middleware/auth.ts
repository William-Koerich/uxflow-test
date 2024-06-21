import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {jwtConfig} from '../../config';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    try {
        req.user = jwt.verify(token, jwtConfig.secret);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
