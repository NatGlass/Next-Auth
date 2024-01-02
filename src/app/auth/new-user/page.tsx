import {Button} from '@/components/ui/button';
import Link from 'next/link';

function NewUserPage() {
  return (
    <div className="text-center space-y-4">
      <h1>
        Hi there! Looks like you are new here. This is a simple onboarding page for new users.
      </h1>
      <p>Check out the settings page below</p>
      <Link href="/settings">
        <Button className="my-4">Go to settings</Button>
      </Link>
    </div>
  );
}

export default NewUserPage;
