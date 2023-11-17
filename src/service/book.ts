import msql from "../infrastructure/database/mysql";
import { reservation } from "../models/book/type";
import { reservedPsikolog, showReservedPsikolog } from "../models/book";

const makeReservation = async (
    user_id: number,
    psikolog_id: number,
    datetime: string,
) => {
    try {
        await msql.connect();
        const reservation: reservation = {
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

const listReservation = async (psikologId: number) => {
    try {
      await msql.connect();
      const reservation = await showReservedPsikolog(msql, psikologId);
      console.log('Showing reserved reservation', reservation);
      return reservation;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    } finally {
      await msql.disconnect();
    }
  };

export {makeReservation, listReservation};