import Joi from "joi";
import * as httpStatus from "http-status-codes";
import { NextFunction, Response } from "express";

import { buildResponse } from "./response";

type request = 'body' | 'params' | 'query' | 'headers';

export interface validationRequest{
    body?: Joi.ObjectSchema;
    params?: Joi.ObjectSchema;
    query?: Joi.ObjectSchema;
    headers?: Joi.ObjectSchema;
}

const validateRequest = (s: validationRequest) => {
    return (req: any, res: Response, next: NextFunction) => {
        const errors = [];
        for (const loc of Object.keys(s)) {
            const isValid = (
                s[loc as request] as Joi.ObjectSchema
            ).validate(req[loc]);
            if (isValid?.error) {
                errors.push(isValid.error);
            }
        }
        if (errors.length > 0) {
            buildResponse(res, httpStatus.StatusCodes.BAD_REQUEST, errors);
            return;
        }
        return next();
    }
}

export default validateRequest;