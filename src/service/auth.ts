import msql from "../infrastructure/database/mysql";
import jwt from "jsonwebtoken";
import ph from "password-hash";
import { psikolog } from "../models/psikolog/type";
import { addPsikolog, findPsikologByEmail } from "../models/psikolog";
import bcrypt from "bcrypt";

const registerPsikolog = async (
    psikolog_name: string,
    psikolog_email: string,
    psikolog_password: string,
    psikolog_phone: number,
    psikolog_klinik: string,
) => {
    try{
    await msql.connect();
    // const findEmail = await findPsikologByEmail(msql, psikolog_email);
    // console.log("ppp", findEmail);
    // if (!findEmail || !findEmail) {
    //     console.log('Email already registered or missing name');
    //     throw new Error("Email already registered or missing name");
    // }
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const validEmail = emailRegex.test(psikolog_email);
    // console.log('Validating email');
    // console.log('Email is valid:', validEmail);
    // if (!validEmail){
    //     throw new Error("Invalid email");
    // }

    // const phonenumberRegex = /(0)(\d{10,12})/;
    // const validPhonenumber = phonenumberRegex.test(String(psikolog_phone));
    // if (!validPhonenumber){
    //     throw new Error("Invalid Phonenumber");
    // }
    const saltRounds = 10; // You can adjust the number of salt rounds
    const hashedPassword = await bcrypt.hash(psikolog_password, saltRounds);

    console.log("Hashed password:", hashedPassword);

    console.log('Adding psikolog to database');
    const psikolog: psikolog = {
        psikolog_name: psikolog_name,
        psikolog_email: psikolog_email,
        psikolog_password: hashedPassword,
        psikolog_phone: String(psikolog_phone),
        psikolog_klinik: psikolog_klinik,
    };
    console.log("ppp", psikolog);

    await addPsikolog(msql, psikolog);
    console.log('Psikolog added to database');
}
catch (error){
    console.error('Error:', error);
    throw error;
} finally {
    await msql.disconnect();
}
}

const loginPsikolog = async (email: string, password: string) => {
    try {
        console.log('Connecting to MySQL');
        await msql.connect();
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        throw error;
    }

    console.log('Finding psikolog by email');
    const user = await findPsikologByEmail(msql, email);
    if (!user){
        throw new Error("Email not registered");
    }

    console.log('Verifying password');
    console.log('Entered Password:', password);
    console.log('Stored Hashed Password:', user.psikolog_password);
    if (user.psikolog_password !== password){
        throw new Error("Wrong password");
    }

    console.log('Generating JWT');
    const payload = {
        psikolog_email: email,
        psiolog_password: password,
    }
    const secret = process.env.JWT_SECRET!;
    const duration = process.env.JWT_DURATION!;
    const token = jwt.sign(payload, secret, { expiresIn: duration });
    return token;
}

export {registerPsikolog, loginPsikolog};