import {Reservation} from './type';

export const reservedPsikolog =async (msql:any, reserved: Reservation) => {
    console.log('Adding reservation to database');
    try{
        const prisma = await msql.prisma();
        await prisma.reservation.create({
            data: {
                psikolog_id: reserved.psikolog_id,
                user_id: reserved.user_id,
                datetime : reserved.datetime,
            }
        });
    } catch (error){
        console.error('Error:', error);
        throw error;
    }
}

export const showReservedPsikolog = async (msql: any, id: number) => {
    console.log('Showing id', id);
    try {
        const prisma = await msql.prisma();
        const psikolog = await prisma.reservation.findMany({
            where: {
                psikolog_id: id,
            },
        });
        console.log('Id', id);
        console.log('Showing reserved psikolog', psikolog);
        return psikolog;
    } catch (error) {
        console.error('Error in findPsikologById:', error);
        throw error;
    }
}
