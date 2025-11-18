import { prisma } from './db.server';

export const getAllFeedbacks = async () => {
   return await prisma.feedback.findMany({
      orderBy: {
         id: 'asc',
      },
   });
};
