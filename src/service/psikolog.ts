import mysql from "../infrastructure/database/mysql";
import { psikolog } from "../models/psikolog/type";
import { addPsikolog,
    showPsikolog,
    findPsikologByEmail,
    findPsikologById,
    updatePsikologName,
    updatePsikologKlinik,
    updatePsikologPhonenumber,
    updatePsikologPassword,
    updatePsikologEmail } from "../models/psikolog";

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

const updateName = async (
    psikolog_id: number,
    psikolog_name: string ) => {
        await mysql.connect();
        const findId = await findPsikologById(mysql, psikolog_id);
        const updatePsikolog = await updatePsikologName(mysql, findId, psikolog_name);
        if (!findId){
            throw new Error("Psikolog not found");
        }
        const updated: psikolog = {
            psikolog_email: findId.psikolog_email,
            psikolog_password: findId.psikolog_password,
            psikolog_name: updatePsikolog.psikolog_name,
            psikolog_klinik: findId.psikolog_klinik,
            psikolog_phone: findId.psikolog_phone
        };
        return updated;
    }

const updateKlinik = async (
    psikolog_id: number,
    psikolog_klinik: string ) => {
        await mysql.connect();
        const findId = await findPsikologById(mysql, psikolog_id);
        const updatePsikolog = await updatePsikologKlinik(mysql, findId, psikolog_klinik);
        if (!findId){
            throw new Error("Psikolog not found");
        }
        const updated: psikolog = {
            psikolog_email: findId.psikolog_email,
            psikolog_password: findId.psikolog_password,
            psikolog_name: findId.psikolog_name,
            psikolog_klinik: updatePsikolog.psikolog_klinik,
            psikolog_phone: findId.psikolog_phone
        };
        return updated;
    }

const updatePhonenumber = async (
    psikolog_id: number,
    psikolog_phone: string ) => {
        await mysql.connect();
        const findId = await findPsikologById(mysql, psikolog_id);
        const updatePsikolog = await updatePsikologPhonenumber(mysql, findId, psikolog_phone);
        if (!findId){
            throw new Error("Psikolog not found");
        }
        const updated: psikolog = {
            psikolog_email: findId.psikolog_email,
            psikolog_password: findId.psikolog_password,
            psikolog_name: findId.psikolog_name,
            psikolog_klinik: findId.psikolog_klinik,
            psikolog_phone: updatePsikolog.psikolog_phone
        };
        return updated;
    }

const updatePassword = async (
    psikolog_id: number,
    psikolog_password: string ) => {
        await mysql.connect();
        const findId = await findPsikologById(mysql, psikolog_id);
        const updatePsikolog = await updatePsikologPassword(mysql, findId, psikolog_password);
        if (!findId){
            throw new Error("Psikolog not found");
        }
        const updated: psikolog = {
            psikolog_email: findId.psikolog_email,
            psikolog_password: updatePsikolog.psikolog_password,
            psikolog_name: findId.psikolog_name,
            psikolog_klinik: findId.psikolog_klinik,
            psikolog_phone: findId.psikolog_phone
        };
        return updated;
    }

const updateEmail = async (
    psikolog_id: number,
    psikolog_email: string ) => {
        await mysql.connect();
        const findId = await findPsikologById(mysql, psikolog_id);
        const updatePsikolog = await updatePsikologEmail(mysql, findId, psikolog_email);
        if (!findId){
            throw new Error("Psikolog not found");
        }
        const updated: psikolog = {
            psikolog_email: updatePsikolog.psikolog_email,
            psikolog_password: findId.psikolog_password,
            psikolog_name: findId.psikolog_name,
            psikolog_klinik: findId.psikolog_klinik,
            psikolog_phone: findId.psikolog_phone
        };
        return updated;
    }


export{ add, showPsikologId, updateName, updateKlinik, updatePhonenumber, updatePassword, updateEmail };