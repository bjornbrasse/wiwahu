import { useLoaderData } from '@remix-run/react';
import { Container } from '~/components/container';
import { getUsers } from '~/services/user.server';
import { requireSessionUser } from '~/session.server';

import type { LoaderFunction } from '@remix-run/node';
import type { RouteMatch } from '@remix-run/react';
import type { User } from '~/models/user.server';
import type { Handle, ThumbMenuItem } from '~/types';
import { db } from '~/utils/db.server';
// import { CustomError } from '~/types';

export const handle: Handle = {
  id: 'AdminUsersPage',
  thumbMenuItems: (match: RouteMatch): ThumbMenuItem[] => {
    const items: ThumbMenuItem[] = [
      {
        caption: 'Organisaties',
        to: `/admin/organisations`,
        type: 'navlink',
      },
      {
        caption: 'Gebruikers',
        to: `/admin/users`,
        type: 'navlink',
      },
    ];
    return items;
  },
};

type LoaderData = {
  users: User[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireSessionUser(request, { isAdmin: true });

  if (!user) throw new Error('Probleem');

  const users = await getUsers(db);

  return { users };
};

export default function AdminUsers() {
  const { users } = useLoaderData<LoaderData>();

  return (
    <Container>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id}>{`${user.firstName} ${user.lastName}`}</div>
      ))}
    </Container>
  );
}
