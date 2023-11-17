import { addSubscribe } from "../models/subscribe";
import { Request, Response, NextFunction } from 'express';
import msql from '../infrastructure/database/mysql'; // replace with your actual mysql connection module
import { subscriber } from "../models/subscribe/type";

const subscribePremium = async (
    req: Request
) => {

    try {
        const subscriber: subscriber = {
            user_id: req.body.user_id,
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            user_password: req.body.user_password,
            user_phone: req.body.user_phone,
        };
        const result = await addSubscribe(
            msql, subscriber
        );
        console.log("the result is " + result);
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export { subscribePremium };