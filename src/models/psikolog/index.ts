import msql from "../../infrastructure/database/mysql";
import { psikolog } from "./type";

const addPsikolog = async (msql: any, psikolog: psikolog) => {
    console.log('Adding psikolog to database');
    try {
        const prisma = await msql.prisma();
        await prisma.psikolog.create({
            data: {
                psikolog_name: psikolog.psikolog_name,
                psikolog_email: psikolog.psikolog_email,
                psikolog_password: psikolog.psikolog_password,
                psikolog_phone: psikolog.psikolog_phone,
                psikolog_klinik: psikolog.psikolog_klinik,
            }
        });

        console.log('Psikolog added successfully');
    } catch (error) {
        console.error('Error adding psikolog:', error);
        throw new Error('Failed to add psikolog'); // You can customize this message
    }
};


const showPsikolog = async (msql: any) => {
    const prisma = await msql.prisma();
    const psikolog = await prisma.psikolog.findMany();
    if (psikolog.length === 0) {
        console.warn('Warning: No psikolog records found in the database');
      }
    return psikolog;
}

const findPsikologByEmail = async (msql: any, email: string) => {
    try{
    const prisma = await msql.prisma();
    const findPsikolog = await prisma.psikolog.findMany({
        where: {
            psikolog_email: email,
        },
    });

    const psikolog : psikolog = {
    psikolog_email: findPsikolog[0].psikolog_email,
    psikolog_password: findPsikolog[0].psikolog_password,
    psikolog_name: findPsikolog[0].psikolog_name,
    psikolog_klinik: findPsikolog[0].psikolog_klinik,
    psikolog_phone: findPsikolog[0].psikolog_phone,
    };
    return psikolog;}
    catch (error){
        console.error('Error:', error);
        throw error;
    } finally {
        await msql.disconnect;
    }
}

const findPsikologById = async (msql: any, id: number) => {
    try {
      // Ensure that id is a valid number
      if (typeof id !== 'number' || isNaN(id)) {
        throw new Error('Invalid id provided');
      }
  
      // Access Prisma instance from msql
      const prisma = await msql.prisma();
  
      // Use Prisma Client to find a Psikolog by id
      const psikolog = await prisma.psikolog.findUnique({
        where: {
          psikolog_id: id,
        },
      });
  
      // Check if Psikolog was found
      if (!psikolog) {
        throw new Error(`Psikolog with id ${id} not found`);
      }
  
      return psikolog;
    } catch (error) {
      console.error('Error in findPsikologById:', error);
      throw error;
    } finally {
      // Make sure to disconnect from Prisma after the operation
      await msql.disconnect;
    }
  };
  

const updatePsikologName = async (msql: any, id: number, name: string) => {
    const prisma = await msql.prisma();
    const psikolog = await prisma.psikolog.update({
        where: {
            psikolog_id: id,
        },
        data: {
            psikolog_name: name,
        },
    });
    return psikolog;
}

const updatePsikologKlinik = async (msql: any, id: number, klinik: string) => {
    const prisma = await msql.prisma();
    const psikolog = await prisma.psikolog.update({
        where: {
            psikolog_id: id,
        },
        data: {
            psikolog_klinik: klinik,
        },
    });
    return psikolog;
}

const updatePsikologPhonenumber = async (msql: any, id: number, phonenumber: string) => {
    const prisma = await msql.prisma();
    const psikolog = await prisma.psikolog.update({
        where: {
            psikolog_id: id,
        },
        data: {
            psikolog_phone: phonenumber,
        },
    });
    return psikolog;
}

const updatePsikologPassword = async (msql: any, id: number, password: string) => {
    const prisma = await msql.prisma();
    const psikolog = await prisma.psikolog.update({
        where: {
            psikolog_id: id,
        },
        data: {
            psikolog_password: password,
        },
    });
    return psikolog;
}

const updatePsikologEmail = async (msql: any, id: number, email: string) => {
    const prisma = await msql.prisma();
    const psikolog = await prisma.psikolog.update({
        where: {
            psikolog_id: id,
        },
        data: {
            psikolog_email: email,
        },
    });
    return psikolog;
}

export{
    addPsikolog,
    showPsikolog,
    findPsikologByEmail,
    findPsikologById,
    updatePsikologName,
    updatePsikologKlinik,
    updatePsikologPhonenumber,
    updatePsikologPassword,
    updatePsikologEmail
};