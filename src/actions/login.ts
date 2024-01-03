'use server';

import {getUserByEmail} from '@/data/user';
import {sendVerificationEmail} from '@/lib/email';
import {generateVerificationToken} from '@/lib/tokens';
import {LoginSchema, LoginSchemaType} from '@/schemas';
import {AuthError} from 'next-auth';
import {signIn} from '../../auth';
import {DEFAULT_LOGIN_REDIRECT} from '../../routes';

// eslint-disable-next-line import/prefer-default-export
export async function login(values: LoginSchemaType) {
  const validatedValues = LoginSchema.safeParse(values);

  if (!validatedValues.success) {
    return {error: 'Invalid credentials'};
  }

  const {email, password} = validatedValues.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {error: 'Account does not exist. Please sign up.'};
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return {success: 'Verification email sent'};
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
