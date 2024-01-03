import {auth} from '@/../auth';
import {SessionProvider} from 'next-auth/react';
import {PropsWithChildren} from 'react';

async function SettingsLayout({children}: PropsWithChildren) {
  const session = await auth();
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default SettingsLayout;
