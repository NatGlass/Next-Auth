'use server';

import {getUserByEmail} from '@/data/user';
import { ResetSchema, ResetSchemaType } from '@/schemas';
import { sendPasswordResetEmail } from '@/lib/email';
import { generatePasswordResetToken } from '@/lib/tokens';

export async function reset(values: ResetSchemaType) {
  const validatedValues = ResetSchema.safeParse(values);

  if (!validatedValues.success) {
    return {error: 'Invalid email'};
  }

  const {email} = validatedValues.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email) {
    return {error: 'Account does not exist. Please sign up.'};
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

  return {success: 'Reset email sent'};
}
