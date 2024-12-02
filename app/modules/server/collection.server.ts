import { Collection } from '@prisma/client';
import { prisma } from './db.server';

export const getCollectionInfo = async (
   code: string,
): Promise<Collection | null> => {
   return await prisma.collection.findFirst({
      where: {
         collectionCode: code,
      },
   });
};
