'use server';

import {currentRole} from '@/lib/auth';
import {UserRole} from '@prisma/client';

export async function admin() {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return {success: "You're an admin!"};
  }

  return {error: "You're not an admin!"};
}
