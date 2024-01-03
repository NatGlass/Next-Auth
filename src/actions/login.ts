'use server';

import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { getUserByEmail } from '@/data/user';
import { sendTwoFactorEmail, sendVerificationEmail } from '@/lib/email';
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/tokens';
import { LoginSchema, LoginSchemaType } from '@/schemas';
import { AuthError } from 'next-auth';
import prisma from '@/lib/db';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import { signIn } from '../../auth';
import { DEFAULT_LOGIN_REDIRECT } from '../../routes';

// eslint-disable-next-line import/prefer-default-export
export async function login(values: LoginSchemaType) {
  const validatedValues = LoginSchema.safeParse(values);

  if (!validatedValues.success) {
    return {error: 'Invalid credentials'};
  }

  const {email, password, code} = validatedValues.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {error: 'Account does not exist. Please sign up.'};
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return {success: 'Verification email sent'};
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: 'Invalid code' };
      }
        
        if (twoFactorToken?.token !== code) {
          return { error: 'Invalid code' };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: 'Code has expired' };
      }

      await prisma.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
      
      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }


      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        }
      })

    } else {
      const twoFactorToken = await generateTwoFactorToken(email);

      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);

      return {twoFactor: true};
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {error: 'Invalid credentials'};
        default:
          return {error: 'An error occurred'};
      }
    }

    throw error;
  }

  return {success: 'Verification email sent'};
}
