'use client';

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import useCurrentUser from '@/hooks/useCurrentUser';
import {User} from 'lucide-react';
import LogoutButton from './logout-button';

function UserButton() {
    const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
              <LogoutButton>
                  <DropdownMenuItem>
                      Logout
                  </DropdownMenuItem>
              </LogoutButton>
          </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
