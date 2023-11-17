import mysql from "../infrastructure/database/mysql";
import { psikolog } from "../models/psikolog/type";
import { addPsikolog, findPsikologByEmail, findPsikologById, updatePsikolog } from "../models/psikolog";
import { addFeedback, deleteFeedback, showList } from "../models/feedback";
import { deletePsikolog } from "./auth";

const add = async (
    psikolog_email: string,
    psikolog_password: string,
    psikolog_name: string,
    psikolog_klinik: string,
    psikolog_phone: string
) => {
    await mysql.connect();
    const findEmail = await findPsikologByEmail(mysql, psikolog_email);
    if (findEmail){
        throw new Error("Email already registered");
    }

    const emailRegex = /\S+@\S+\.\S+/;
    const validEmail = emailRegex.test(psikolog_email);
    if (!validEmail){
        throw new Error("Invalid email");
    }

    const phonenumberRegex = /(0)(\d{10,12})/;
    const validPhonenumber = phonenumberRegex.test(String(psikolog_phone));
    if (!validPhonenumber){
        throw new Error("Invalid phonenumber");
    }

    const psikolog: psikolog = {
        psikolog_email: psikolog_email,
        psikolog_password: psikolog_password,
        psikolog_name: psikolog_name,
        psikolog_klinik: psikolog_klinik,
        psikolog_phone: psikolog_phone
    };

    await addPsikolog(mysql, psikolog);
}

const showPsikologId = async (
    psikolog_id: number)  => {
    await mysql.connect();
    const psikolog = await findPsikologById(mysql, psikolog_id);
    if (!psikolog){
        throw new Error("Psikolog not found");
    }
    return psikolog;
}

const updateProfile = async (
    psikolog_id: number,
    psikolog_name: string,
    psikolog_klinik: string,
    psikolog_phone: string
) => {
    try {
        console.log('Starting updateProfile');
        
        await mysql.connect();

        const updatedFields: any = {};

        if (psikolog_name) {
            updatedFields.psikolog_name = psikolog_name;
            console.log("Updated psikolog_name:", psikolog_name);
        }
        if (psikolog_klinik) {
            updatedFields.psikolog_klinik = psikolog_klinik;
            console.log("Updated psikolog_klinik:", psikolog_klinik);
        }
        if (psikolog_phone) {
            updatedFields.psikolog_phone = psikolog_phone;
            console.log("Updated psikolog_phone:", psikolog_phone);
        }

        if (Object.keys(updatedFields).length === 0) {
            throw new Error('No fields to update');
        }

        const psikolog = await updatePsikolog(mysql, psikolog_id, updatedFields);

        console.log('Updated psikolog:', psikolog);

        if (!psikolog) {
            throw new Error("Psikolog not found");
        }

        console.log('Finished updateProfile');
        
        return psikolog;
    } catch (error) {
        console.error('Error in updateProfile:', error);
        throw error;
    } finally {
        await mysql.disconnect();
    }
};

const giveFeedback = async (
    reservation_id: number,
    feedback_content: string,) => {
        await mysql.connect();
        const feedback = await addFeedback(mysql, feedback_content, reservation_id);
        return feedback;
    }

const delFeedback = async (
    feedback_id: number) => {
        await mysql.connect();
        const feedback = await deleteFeedback(mysql, feedback_id);
        return feedback;
    }

const showFeedbackByReservationId = async (
    feedback_id: number) => {
        await mysql.connect();
        const feedback = await showList(mysql, feedback_id);
        return feedback;
    }
const deleteProfile = async (psikolog_id: number) => {
        try {
          await mysql.connect();
          const deletedPsikolog = await deletePsikolog(mysql, psikolog_id);
      
          console.log('Deleted psikolog:', deletedPsikolog);
      
          if (!deletedPsikolog) {
            throw new Error('Psikolog not found');
          }
      
          console.log('Finished deleteProfile');
      
          return deletedPsikolog;
        } catch (error) {
          console.error('Error in deleteProfile:', error);
          throw error;
        } finally {
          await mysql.disconnect();
        }
      };



export{ add, showPsikologId, updateProfile, giveFeedback, delFeedback, showFeedbackByReservationId , deleteProfile};