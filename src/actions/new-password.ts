'use server';

import {getPasswordResetTokenByToken} from '@/data/password-reset-token';
import {getUserByEmail} from '@/data/user';
import prisma from '@/lib/db';
import {NewPasswordSchema, NewPasswordSchemaType} from '@/schemas';
import bcrypt from 'bcryptjs';

export async function newPassword(values: NewPasswordSchemaType, token?: string | null) {
  if (!token) {
    return {error: 'Invalid token'};
  }

  const validatedValues = NewPasswordSchema.safeParse(values);

  if (!validatedValues.success) {
    return {error: 'Invalid password'};
  }

  const {password} = validatedValues.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return {error: 'Invalid token'};
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {error: 'Token has expired'};
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {error: 'Email does not exist'};
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma?.user.update({
    where: {id: existingUser.id},
    data: {password: hashedPassword},
  });

  await prisma?.passwordResetToken.delete({
    where: {id: existingToken.id},
  });

  return {success: 'Password changed'};
}
