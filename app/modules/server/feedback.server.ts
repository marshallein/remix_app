import { prisma } from './db.server';

export const getAllFeedbacks = async () => {
   return await prisma.feedback.findMany({
      orderBy: {
         id: 'asc',
      },
   });
};

export type CreateFeedbackPayload = {
   customer: string;
   avatarUrl: string;
   comment: string;
};

export const createFeedback = async (payload: CreateFeedbackPayload) => {
   try {
      const feedback = await prisma.feedback.create({
         data: {
            customer: payload.customer,
            avatarUrl: payload.avatarUrl,
            comment: payload.comment,
         },
      });

      return { ok: true, feedback };
   } catch (error) {
      console.error('Error creating feedback:', error);
      return { ok: false, error };
   }
};
