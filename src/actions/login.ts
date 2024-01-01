'use server';

import {LoginSchema, LoginSchemaType} from '@/schemas';

// eslint-disable-next-line import/prefer-default-export
export async function login(values: LoginSchemaType) {
  const validatedValues = LoginSchema.safeParse(values);

  if (!validatedValues.success) {
    return {error: 'Invalid credentials'};
  }

  return {success: 'Verification email sent'};
}
