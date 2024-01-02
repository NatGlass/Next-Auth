import {getUserById} from '@/data/user';
import prisma from '@/lib/db';
import {PrismaAdapter} from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import authConfig from './auth.config';

export const {
  handlers: {GET, POST},
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    // async signIn({user}) {
    //   const existingUser = await getUserById(user.id);

    //   // Disallow sign in if the user has not verified their email address
    //   if (!existingUser || !existingUser.emailVerified) return false;

    //   return true;
    // },
    async session({session, token}) {
      if (token.sub && session.user) {
        // eslint-disable-next-line no-param-reassign
        session.user.id = token.sub; // this allows access to the user id
      }

      if (token.role && session.user) {
        // eslint-disable-next-line no-param-reassign
        session.user.role = token.role as 'ADMIN' | 'USER';
      }

      return session;
    },
    async jwt({token}) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      // eslint-disable-next-line no-param-reassign
      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {strategy: 'jwt'},
  ...authConfig,
});
