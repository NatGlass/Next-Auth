import {ExtendedUser} from '@/../next-auth';
import {Card, CardHeader} from '@/components/ui/card';

type UserInfoProps = {
  user?: ExtendedUser;
  label: string;
};

function UserInfo({user, label}: UserInfoProps) {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
        <p>{JSON.stringify(user?.name)}</p>
      </CardHeader>
    </Card>
  );
}

export default UserInfo;
