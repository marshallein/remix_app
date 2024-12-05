import { json } from '@remix-run/node';
import { prisma } from './db.server';
import { generateRandomId } from '../domain';

export type CartItemPayLoad = {
   price: number;
   productId: number;
   quantity: number;
};

export type OrderPayLoad = {
   totalPrice: number;
   userId: number;
   cartId: string;
   cartItem: CartItemPayLoad[];
};

export const createOrder = async (payload: OrderPayLoad) => {
   try {
      const order = await prisma.order.create({
         data: {
            orderName: generateRandomId(),
            totalPrice: payload.totalPrice,
            userId: payload.userId,
         },
      });

      await prisma.orderItems.createMany({
         data: payload.cartItem.map((item) => {
            return {
               orderId: order.id,
               productId: item.productId,
               price: item.price,
            };
         }),
      });

      await prisma.cartItem.deleteMany({
         where: {
            cartId: payload.cartId,
         },
      });

      await prisma.cart.delete({
         where: {
            id: payload.cartId,
         },
      });

      return json({ message: 'Done' }, { status: 200 });
   } catch (e) {
      console.log('error has been occur in API create Order', e);
      return Response.error;
   }
};
