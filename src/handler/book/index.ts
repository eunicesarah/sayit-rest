import { Request } from "express";
import { makeReservation } from "../../service/book";

const bookingPsikolog = async (req: any) => {
    try{
        const user_id = req.body.user_id;
        const psikolog_id = req.body.psikolog_id;
        const datetime = req.body.datetime;

        const result = await makeReservation(user_id, psikolog_id, datetime);
        console.log("the result is " + result);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }}

export { bookingPsikolog };
