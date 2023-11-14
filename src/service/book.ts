import msql from "../infrastructure/database/mysql";
import { Reservation } from "../models/book/type";
import { reservedPsikolog, showReservedPsikolog } from "../models/book";

const makeReservation = async (
    psikolog_id: number,
    user_id: number,
    datetime: string,
) => {
    try {
        await msql.connect();
        const reservation: Reservation = {
            psikolog_id: psikolog_id,
            user_id: user_id,
            datetime: datetime,
        };
        await reservedPsikolog(msql, reservation);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    } finally {
        await msql.disconnect();
    }
}

const listReservation = async (psikolog_id: number) => {
    try {
        await msql.connect();
        console.log('Showing reserved psikoolog', psikolog_id);
        const reservation = await showReservedPsikolog(msql, psikolog_id);
        console.log('Showing reserved reservation', reservation);
        return reservation;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    } finally {
        await msql.disconnect();
    }
}

export {makeReservation, listReservation};