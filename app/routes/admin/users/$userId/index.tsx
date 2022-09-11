import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getUser } from '~/services/user.server';
import { db } from '~/utils/db.server';

import type { LoaderFunction } from '@remix-run/node';

type LoaderData = {
  user: Exclude<Awaited<ReturnType<typeof getUser>>, null>;
};

export const loader: LoaderFunction = async ({ params }) => {
  const user = await getUser(db, { id: params.userId ?? '' });

  if (!user) return redirect('/admin/users');

  return json<LoaderData>({ user });
};

export default function UserPage() {
  const { user } = useLoaderData<LoaderData>();

  return (
    <div>
      <h1>User</h1>
      <p>{user.firstName}</p>
    </div>
  );
}
