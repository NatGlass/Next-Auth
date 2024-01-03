import {auth} from '@/../auth';
import {SessionProvider} from 'next-auth/react';
import {PropsWithChildren} from 'react';
import Navbar from './_components/navbar';

async function SettingsLayout({children}: PropsWithChildren) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="w-full h-full flex flex-col gap-y-10 items-center justify-center">
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
}

export default SettingsLayout;
