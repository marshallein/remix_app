import { CartItem } from '@prisma/client';
import { prisma } from './db.server';

export type CartItemPayLoad = {
   price: number;
} & CartItem;

export type OrderPayLoad = {
   totalPrice: number;
   userId: number;
   cartItem: CartItemPayLoad[];
};

export const createOrder = async (payload: OrderPayLoad) => {
   try {
      const order = await prisma.order.create({
         data: {
            orderName: 'OrderNew',
            totalPrice: payload.totalPrice,
            userId: payload.userId,
         },
      });

      return await prisma.orderItems.createMany({
         data: payload.cartItem.map((item) => {
            return {
               orderId: order.id,
               productId: item.productId,
               price: item.price,
            };
         }),
      });
   } catch {
      return Response.error;
   }
};
