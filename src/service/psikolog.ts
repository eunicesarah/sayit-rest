import mysql from "../infrastructure/database/mysql";
import { psikolog } from "../models/psikolog/type";
import { addPsikolog, findPsikologByEmail, findPsikologById, updatePsikolog } from "../models/psikolog";

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
    psikolog_phone: string) => {
        await mysql.connect();
        const updatedFields: any = {}

        if (psikolog_name) {
            updatedFields.psikolog_name = psikolog_name;
            console.log("ppp", psikolog_name);
        }
        if (psikolog_klinik) {
            updatedFields.psikolog_klinik = psikolog_klinik;
            console.log("aaaa", psikolog_klinik);
        }
        if (psikolog_phone) {
            updatedFields.psikolog_phone = psikolog_phone;
            console.log("bbbb", psikolog_phone);
        }

        if (Object.keys(updatedFields).length === 0) {
            throw new Error('No fields to update');
        }

        const psikolog = await updatePsikolog(mysql, psikolog_id, updatedFields);
        if (!psikolog){
            throw new Error("Psikolog not found");
        }
        return psikolog;
    }


export{ add, showPsikologId, updateProfile };