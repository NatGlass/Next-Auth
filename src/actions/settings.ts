'use server';

import {getUserById} from '@/data/user';
import { SettingsSchemaType } from '@/schemas';
import prisma from '@/lib/db';
import { currentUser } from '@/lib/auth';

export async function settings(values: SettingsSchemaType) {
  const user = await currentUser();

  if (!user) {
    return {error: "You're not logged in"};
  }

  // Get the user from the database to make sure they exist outside of stored cookies
  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return {error: "You're not logged in"};
    }
    
    await prisma.user.update({
        where: {
            id: dbUser.id
        },
        data: {...values}
    })

    return {success: "Settings updated"}
}
