import { Request, Response, NextFunction } from "express";
import { jLoginReq, jLoginRes } from "./type";
import { loginPsikolog, registerPsikolog } from "../../service/auth";
import * as HttpStatus from 'http-status-codes';
import { buildResponse } from "../../util/response";

const login = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const users = {
            email: email,
            password: password
        };

        const result = loginPsikolog(users.email, users.password);
        res.send("the result is " + result);
    }
    catch (error) {
        next(error);
        res.send("failed");
    }
}
}

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await registerPsikolog(
            req.body.psikolog_email,
            req.body.psikolog_name,
            req.body.psikolog_password,
            req.body.psikolog_phonenumber,
            req.body.psikolog_klinik,
        );
        
        // const statusCode =
        //     result === null
        //         ? HttpStatus.StatusCodes.BAD_REQUEST
        //         : HttpStatus.StatusCodes.OK;

        // buildResponse(res, statusCode, result);
        console.log("the result is " + result);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

export { login, register };
