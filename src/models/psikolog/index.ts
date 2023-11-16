import msql from "../../infrastructure/database/mysql";
import { psikolog } from "./type";

export const addPsikolog = async (msql: any, psikolog: psikolog) => {
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


export const showPsikolog = async (msql: any) => {
    const prisma = await msql.prisma();
    const psikolog = await prisma.psikolog.findMany();
    if (psikolog.length === 0) {
        console.warn('Warning: No psikolog records found in the database');
      }
    return psikolog;
}

export const findPsikologByEmail = async (msql: any, email: string) => {
    try {
      const prisma = await msql.prisma();
      console.log('Finding psikolog by email');
  
      const findPsikolog = await prisma.psikolog.findFirst({
        where: {
          psikolog_email: email,
        },
      });
  
      console.log('Psikolog found:', findPsikolog);
      return findPsikolog;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    } finally {
      await msql.disconnect(); // Correct the function call to disconnect()
    }
  };
  

export const findPsikologById = async (msql: any, id: number) => {
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
  
  export const updatePsikolog = async (msql: any, id: number, updatedFields: any) => {
    try {
      console.log('asd', msql);
      console.log('ahskdas', msql.prisma);
      console.log('adsad', msql.prisma.psikolog);

      const prisma = await msql.prisma();
      const updatedPsikolog = await prisma.psikolog.update({
        where: { psikolog_id: id },
        data: updatedFields,
      });
      console.log('Updated psikolog:', updatedPsikolog);
  
      return updatedPsikolog;
    } catch (error) {
      console.error('Error updating psikolog:', error);
      throw error;
    }
  };
  

export const bookPsikolog = async (msql: any, id: number, email: string) => {
    const prisma = await msql.prisma();
    const book = await prisma.book.create({
        data: {
            psikolog_id: id,
            user_email: email,
        }
    });
    return book;
}