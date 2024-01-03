'use client';

import {signOut} from 'next-auth/react';

function LogoutButton({children}: {children?: React.ReactNode}) {
  const onClick = () => signOut();
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}

export default LogoutButton;
