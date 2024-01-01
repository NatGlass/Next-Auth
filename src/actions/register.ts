'use server';

import {createUser, getUserByEmail} from '@/lib/data';
import {RegisterSchema, RegisterSchemaType} from '@/schemas';
import bcrypt from 'bcrypt';

// eslint-disable-next-line import/prefer-default-export
export async function register(values: RegisterSchemaType) {
  const validatedValues = RegisterSchema.safeParse(values);

  if (!validatedValues.success) {
    return {error: 'Invalid credentials'};
  }

  const {email, password, name} = validatedValues.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {error: 'Email is already associated with an account'};
  }

  await createUser(name, email, hashedPassword);

  return {success: 'Verification email sent'};
}
