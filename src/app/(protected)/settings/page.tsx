'use client';

import {Button} from '@/components/ui/button';
import {signOut} from 'next-auth/react';

function SettingsPage() {
  const onClick = () => signOut();
  return (
    <div className="shadow-md p-10 rounded-xl">
      <Button onClick={onClick}>Sign out</Button>
    </div>
  );
}

export default SettingsPage;
