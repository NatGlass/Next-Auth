'use server';

import {getUserByEmail} from '@/data/user';
import {getVerificationTokenByToken} from '@/data/verification-token';
import prisma from '@/lib/db';

export async function newVerification(token: string) {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) return {error: 'Invalid token'};

  const hasExpired = new Date() > new Date(existingToken.expires);

  if (hasExpired) return {error: 'Token has expired'};

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return {error: 'Email not found'};

  await prisma.user.update({
    where: {id: existingUser.id},
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await prisma.verificationToken.delete({
    where: {id: existingToken.id},
  });

  return {success: 'Email verified'};
}
