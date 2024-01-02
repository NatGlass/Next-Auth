'use server';

import {getUserByEmail} from '@/data/user';
import {generateVerificationToken} from '@/lib/tokens';
import {RegisterSchema, RegisterSchemaType} from '@/schemas';
import bcrypt from 'bcryptjs';
import prisma from '../lib/db';

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

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  return {success: 'Verification email sent'};
}
