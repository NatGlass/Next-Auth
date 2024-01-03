import {currentUser} from '@/lib/auth';
import UserInfo from '../_components/user-info';

async function ServerPage() {
  const user = await currentUser();
  return <UserInfo user={user} label='Server component auth' />
}

export default ServerPage;
