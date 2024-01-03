'use client';

import {useSession} from 'next-auth/react';

// This hook saves us from having to write `session.data?.user` everywhere to access the user

function useCurrentUser() {
  const session = useSession();

  return session.data?.user;
}

export default useCurrentUser;
