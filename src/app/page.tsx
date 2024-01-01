import LoginButton from '@/components/auth/login-button';
import {Button} from '@/components/ui/button';

function Home() {
  return (
    <div>
      <LoginButton>
        <Button>Login</Button>
      </LoginButton>
    </div>
  );
}

export default Home;
