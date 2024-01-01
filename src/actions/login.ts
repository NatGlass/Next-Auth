'use server';

import {signIn} from '@/../auth';
import {LoginSchema, LoginSchemaType} from '@/schemas';
import {AuthError} from 'next-auth';
import {DEFAULT_LOGIN_REDIRECT} from '../../routes';

// eslint-disable-next-line import/prefer-default-export
export async function login(values: LoginSchemaType) {
  const validatedValues = LoginSchema.safeParse(values);

  if (!validatedValues.success) {
    return {error: 'Invalid credentials'};
  }

  const {email, password} = validatedValues.data;

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
