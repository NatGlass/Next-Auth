import {getTwoFactorConfirmationByUserId} from '@/data/two-factor-confirmation';
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
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
    newUser: '/auth/new-user',
  },
  events: {
    // if the user signs up with a social account, we already know their email is verified
    async linkAccount({user}) {
      await prisma.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date()},
      });
    },
  },
  callbacks: {
    async signIn({user, account}) {
      // Allow OAuth sign in without email verification

      if (account?.provider !== 'Credentials') return true;

      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        console.log({twoFactorConfirmation});

        if (!twoFactorConfirmation) return false;

        await prisma.twoFactorConfirmation.delete({
          where: {id: twoFactorConfirmation.id},
        });
      }

      return true;
    },
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
