import { User } from './type';

const addUser = async (mysql: any, user: User) => {
    const prisma = await mysql.prisma();
    await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password,
            phonenumber: user.phonenumber,
            gender: user.gender
        }
        });
    }

const findUserByEmail = async (mysql: any, email: string) => {
    const prisma = await mysql.prisma();
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    return user;
}

const findUserById = async (mysql: any, id: number) => {
    const prisma = await mysql.prisma();
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });
    return user;
}

const findUserByPhonenumber = async (mysql: any, phonenumber: number) => {
    const prisma = await mysql.prisma();
    const user = await prisma.user.findUnique({
        where: {
            phonenumber: phonenumber,
        },
    });
    return user;
}

export{
    addUser, 
    findUserByEmail,
    findUserById,
    findUserByPhonenumber
} ;