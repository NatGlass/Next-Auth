import {Button} from '@/components/ui/button';
import {auth, signOut} from '../../../auth';

async function SettingsPage() {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session?.user?.name)}
      <form
        action={async () => {
          'use server';

          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
}

export default SettingsPage;
