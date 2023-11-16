import {feedback} from './type';

export const addFeedback = async (mysql: any, feedback_content: string, reservation_id: number) => {
    console.log('Adding feedback to database');
    try {
        const prisma = await mysql.prisma();
        await prisma.feedback.create({
            data: {
                feedback_content: feedback_content,
                reservation_id: reservation_id,
            }
        });

        console.log('Feedback added successfully');
    } catch (error) {
        console.error('Error adding feedback:', error);
        throw new Error('Failed to add feedback'); // You can customize this message
    }
}

export const deleteFeedback = async (mysql: any, feedback_id: number) => {
    try {
        const prisma = await mysql.prisma();
        await prisma.feedback.delete({
            where: {
                feedback_id: feedback_id,
            }
        });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        throw new Error('Failed to delete feedback'); // You can customize this message
    }
}

export const showList = async (mysql: any, feedback_id: number) => {
    try {
        const prisma = await mysql.prisma();
        const feedback = await prisma.feedback.findMany({
            where: {
                feedback_id: feedback_id,
            },
        });
        console.log('Showing feedback', feedback);
        return feedback;
    } catch (error) {
        console.error('Error in findFeedbackById:', error);
        throw error;
    }
}