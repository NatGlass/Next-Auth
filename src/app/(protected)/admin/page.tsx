'use client';

import RoleGate from '@/components/auth/role-gate';
import {Button} from '@/components/ui/button';
import {useCurrentRole} from '@/hooks/useCurrentRole';
import {UserRole} from '@prisma/client';

function AdminPage() {
  const apiClick = () => {
    fetch('/api/admin').then(res => {
      if (res.ok) {
        console.log('ok');
      } else {
        console.error('not ok');
      }
    });
  };

  const role = useCurrentRole();
  return (
    <div>
      Current role: {role}
      <div>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <div>Only admins can see this</div>
          <Button onClick={apiClick}>Test</Button>
        </RoleGate>
      </div>
    </div>
  );
}

export default AdminPage;
