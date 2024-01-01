import {PropsWithChildren} from 'react';

function AuthLayout({children}: PropsWithChildren) {
  return <div className='h-full flex items-center justify-center'>{children}</div>;
}

export default AuthLayout;
