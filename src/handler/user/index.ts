import { Request, Response, NextFunction } from "express";
import { jLoginReq, jLoginRes } from "./type";
import { loginPsikolog, registerPsikolog } from "../../service/auth";
import * as HttpStatus from 'http-status-codes';
import { buildResponse } from "../../util/response";

const login =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const psikolog_email = req.body.psikolog_email;
        const psikolog_password = req.body.psikolog_password;

        // const user = {
        //     psikolog_email: psikolog_email,
        //     psikolog_password: psikolog_password
        // };
        console.log("the user is " + psikolog_email + " " + psikolog_password);
        const result = await loginPsikolog(psikolog_email, psikolog_password);
        console.log("the result is " + result);
    }
    catch (error) {
        next(error);
        res.send("failed");
    }
}

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await registerPsikolog(
            req.body.psikolog_email,
            req.body.psikolog_name,
            req.body.psikolog_password,
            req.body.psikolog_phone,
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
