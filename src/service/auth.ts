import msql from "../infrastructure/database/mysql";
import jwt from "jsonwebtoken";
import ph from "password-hash";
import { psikolog } from "../models/psikolog/type";
import { addPsikolog, findPsikologByEmail } from "../models/psikolog";
import bcrypt from "bcrypt";
import { response } from "express";

const registerPsikolog = async (
    psikolog_name: string,
    psikolog_email: string,
    psikolog_password: string,
    psikolog_phone: number,
    psikolog_klinik: string,
    res: any
) => {
    try{
    await msql.connect();
    // Check if the email already exists
    const existingPsikolog = await findPsikologByEmail(msql, psikolog_email);
    if (existingPsikolog) {
        throw new Error('Email is already registered');
       
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
    return res.json({message: "Psikolog berhasil ditambahkan"});
}
catch (error){
    console.error('Error:', error);
    throw error;
} finally {
    await msql.disconnect();
}
}

const loginPsikolog = async (email: string, password: string, res: any) => {
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
    console.log('Password Match:', await bcrypt.compare(password, user.psikolog_password));
    const passwordMatch = await bcrypt.compare(password, user.psikolog_password);

    if (!passwordMatch) {
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
    return res.json({ token, user });
}

export {registerPsikolog, loginPsikolog};