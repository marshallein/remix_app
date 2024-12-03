import { Product, Promotion } from '@prisma/client';
import { prisma } from './db.server';

export const getProductById = async (
   productId: number,
): Promise<Product | null> => {
   return await prisma.product.findFirst({
      where: {
         id: productId,
      },
   });
};

export const getProducts = async (): Promise<Product[]> => {
   return await prisma.product.findMany();
};

export const getProductsByPromotion = async (
   promotion: Promotion,
): Promise<Product[]> => {
   return await prisma.product.findMany({
      where: {
         promotion: promotion,
      },
      take: 4,
   });
};

export const getProductsByCollection = async (
   code: string,
): Promise<Product[]> => {
   return await prisma.product.findMany({
      where: {
         Collection: {
            collectionCode: code,
         },
      },
   });
};