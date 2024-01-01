import prisma from './db';

export async function getUserByEmail(email: string) {
  try {
    const result = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (result) {
      return {error: 'Email is already associated with an account'};
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return {error: error.message};
    }

    console.error('An unknown error occurred');
    return {error: 'An unknown error occurred'};
  }

  return null;
}

export async function createUser(name: string, email: string, password: string) {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return {error: error.message};
    }

    console.error('An unknown error occurred');
    return {error: 'An unknown error occurred'};
  }
}
