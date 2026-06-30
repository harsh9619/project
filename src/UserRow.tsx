import React from 'react';
import { User } from './store/usersSlice';

interface UserRowProps {
  user: User;
}

function UserRowImpl({ user }: UserRowProps) {
  return (
    <li className="user-row">
      <div className="user-row__name">{user.name}</div>
      <div className="user-row__meta">
        @{user.username} · {user.email} · {user.company.name}
      </div>
    </li>
  );
}

// React.memo prevents re-rendering a row when its own props haven't changed,
// even if a parent re-renders (e.g. while the user is still typing).
export const UserRow = React.memo(UserRowImpl);
