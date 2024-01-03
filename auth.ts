/* eslint-disable no-param-reassign */
import {getTwoFactorConfirmationByUserId} from '@/data/two-factor-confirmation';
import {getUserById} from '@/data/user';
import prisma from '@/lib/db';
import {PrismaAdapter} from '@auth/prisma-adapter';
import {UserRole} from '@prisma/client';
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
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({token}) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      // Allow updating the user's name and email
      token.name = existingUser.name;
      token.email = existingUser.email;

      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {strategy: 'jwt'},
  ...authConfig,
});
