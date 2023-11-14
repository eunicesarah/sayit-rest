import * as httpStatus from "http-status-codes";
import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { buildResponse } from './response';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface MyJwtPayload extends JwtPayload {
  role: 'user' | 'psikolog';
}

// Extend the Express Request interface
interface Request extends ExpressRequest {
  user?: MyJwtPayload;
}

const validateApiKey = () =>{
    return (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'] as string;
    if (!apiKey) {
        return buildResponse(res, httpStatus.StatusCodes.UNAUTHORIZED, 'API key is missing');
    }

    try {
        const decoded = jwt.verify(apiKey, process.env.JWT_SECRET as string) as MyJwtPayload;
        if (!['user', 'psikolog'].includes(decoded.role)) {
            return buildResponse(res, httpStatus.StatusCodes.UNAUTHORIZED, 'Invalid role');
        }
        req.user = decoded;
        next();
    } catch (err) {
        return buildResponse(res, httpStatus.StatusCodes.UNAUTHORIZED, 'Invalid API key');
    }
};
}

export { validateApiKey };