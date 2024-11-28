import { prisma } from './db.server';

export const getProductById = async (productid: number) => {
   return await prisma.product.findFirst({
      where: {
         id: productid,
      },
   });
};
