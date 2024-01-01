import prisma from '@/lib/db';
import {PrismaAdapter} from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import authConfig from './auth.config';

export const {
  handlers: {GET, POST},
  auth,
  signIn,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {strategy: 'jwt'},
  ...authConfig,
});
