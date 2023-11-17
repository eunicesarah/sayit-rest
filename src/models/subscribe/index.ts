import { subscriber } from "./type";

export const addSubscribe = async (msql: any, subscriber: subscriber) => {
    try {
        const prisma = await msql.prisma();
        await prisma.subscriber.create({
            data: {
                user_id: subscriber.user_id,
                user_email: subscriber.user_email,
                user_password: subscriber.user_password,
                user_name: subscriber.user_name,
                user_phone: subscriber.user_phone,
            }
        });
    } catch (error) {
        console.error('Error adding subscriber:', error);
        throw new Error('Failed to add subscriber'); // You can customize this message
    }
}