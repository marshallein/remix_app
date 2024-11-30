import bcrypt from 'bcryptjs';
import { prisma } from './db.server';
import { z } from 'zod';
export type { Cart, CartItem, Product } from '@prisma/client';

export const infoSchema = {
   email: z.string().email('must be in email format'),
   password: z.string().min(1, 'min 1 character').max(10, 'max 10 characters'),
};

export const loginSchema = z.object(infoSchema);

export const registerSchema = z.object({
   username: z.string(),
   name: z.string(),
   ...infoSchema,
});

export type RegisterForm = {
   email: string;
   password: string;
   userName: string;
   name: string;
};

export type LoginForm = {
   email: string;
   password: string;
};

export const createUser = async (user: RegisterForm) => {
   const passwordHash = await bcrypt.hash(user.password, 10);
   const newUser = await prisma.user.create({
      data: {
         email: user.email,
         password: passwordHash,
         username: user.userName,
         name: user.name,
      },
   });
   return { id: newUser.id, email: user.email };
};

export const comparePassword = async (input: string, user: string) => {
   return await await bcrypt.compare(input, user);
};

export const getUserByEmail = async (email: string) => {
   return await prisma.user.findUnique({ where: { email: email } });
};

export const getUserInfoById = async (userId: string) => {
   return await prisma.user.findUnique({
      where: { id: Number(userId) },
   });
};

export const getUserCartInfo = async (userId: string) => {
   return await prisma.cart.findUnique({
      where: {
         userId: Number(userId),
      },
      include: {
         CartItems: {
            include: {
               product: true,
            },
            orderBy: {
               productId: 'asc',
            },
         },
      },
   });
};

export async function addShoppingCart(userId: string) {
   return prisma.cart.create({
      data: {
         userId: Number(userId),
      },
   });
}

export type AddToCartType = {
   productId: number;
   quantity: number;
   userId: number;
};

export async function removeFromCart(userId: string, productId: string) {
   const cart = await getUserCartInfo(userId);

   return prisma.cartItem.deleteMany({
      where: {
         cartId: cart!.id,
         productId: Number(productId),
      },
   });
}

export const addToCart = async (payload: AddToCartType) => {
   const { productId, quantity, userId } = payload;
   console.log('payload', payload);

   let [cart] = await Promise.all([getUserCartInfo(String(userId))]);

   if (!cart) {
      const newCart = await addShoppingCart(String(userId));
      cart = { ...newCart, CartItems: [] };
   }

   console.log('cart value', cart);

   const cartItem = cart.CartItems.find((item) => item.productId === productId);

   console.log('cartItem value', cartItem);

   if (cartItem) {
      console.log(cartItem, 'have');

      const newQuantity = cartItem.quantity + quantity;

      if (newQuantity === 0) {
         return await removeFromCart(String(userId), String(productId));
      }
      return await prisma.cartItem.update({
         data: { quantity: newQuantity },
         where: {
            id: cartItem.id,
         },
      });
   }

   return await prisma.cartItem.create({
      data: {
         cart: { connect: { id: cart.id } },
         product: { connect: { id: productId } },
         quantity,
      },
   });
};
