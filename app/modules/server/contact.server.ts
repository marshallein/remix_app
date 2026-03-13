import { prisma } from './db.server';

export type CreateContactPayload = {
   name: string;
   email: string;
   message: string;
};

export const createContact = async (payload: CreateContactPayload) => {
   try {
      const contact = await prisma.contact.create({
         data: {
            name: payload.name,
            email: payload.email,
            message: payload.message,
         },
      });

      return { ok: true, contact };
   } catch (error) {
      console.error('Error creating contact:', error);
      return { ok: false, error };
   }
};

export const getAllContacts = async () => {
   return await prisma.contact.findMany({
      orderBy: {
         createdAt: 'desc',
      },
   });
};
