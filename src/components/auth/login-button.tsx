'use client';

import {useRouter} from 'next/navigation';

import {LoginButtonProps} from '@/lib/definitions';

function LoginButton({children, mode = 'redirect', asChild}: LoginButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (mode === 'redirect') {
      router.push('/auth/login');
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="cursor-pointer" onClick={handleClick}>
      {children}
    </div>
  );
}

export default LoginButton;
