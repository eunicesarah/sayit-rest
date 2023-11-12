import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class msql{
    public static async connect(): Promise<void>{
        await prisma.$connect();
    }

    public static async disconnect(): Promise<void>{
        await prisma.$disconnect();
    }

    public static async prisma(): Promise<PrismaClient>{
        return prisma;
    }
}