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
   address: string;
   telephone: string;
   cartItem: CartItemPayLoad[];
};

export const createOrder = async (payload: OrderPayLoad) => {
   try {
      await prisma.$transaction(async (tx) => {
         const order = await tx.order.create({
            data: {
               orderName: generateRandomId(),
               totalPrice: payload.totalPrice,
               userId: payload.userId,
               shippingAddress: payload.address,
               shippingTelephone: payload.telephone,
            },
         });

         await tx.orderItems.createMany({
            data: payload.cartItem.map((item) => {
               return {
                  orderId: order.id,
                  productId: item.productId,
                  price: item.price,
                  quantity: item.quantity,
               };
            }),
         });

         await tx.cartItem.deleteMany({
            where: {
               cartId: payload.cartId,
            },
         });

         await tx.cart.delete({
            where: {
               id: payload.cartId,
            },
         });
      });

      return json({ message: 'Done' }, { status: 200 });
   } catch (e) {
      console.log('error has been occur in API create Order', e);
      return new Response('Unable to create order', { status: 500 });
   }
};

export const getAllOrdersById = async (userId: number) => {
   const orders = await prisma.order.findMany({
      where: {
         userId: userId,
      },
      include: {
         OrderItems: {
            include: {
               product: true,
            },
            orderBy: {
               productId: 'asc',
            },
         },
      },
   });

   return orders;
};

export const getOrderById = async (orderId: number) => {
   return await prisma.order.findFirst({
      where: {
         id: orderId,
      },
      include: {
         OrderItems: true,
      },
   });
};
