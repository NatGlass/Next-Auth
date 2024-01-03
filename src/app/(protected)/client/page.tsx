'use client';

import useCurrentUser from '@/hooks/useCurrentUser';
import UserInfo from '../_components/user-info';

function ClientPage() {
  const user = useCurrentUser();
  return <UserInfo user={user} label="Client component auth" />;
}

export default ClientPage;
