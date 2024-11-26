import bcrypt from 'bcryptjs';
import { prisma } from './db.server';
import { z } from 'zod';

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
      select: { id: true, email: true, name: true },
   });
};
