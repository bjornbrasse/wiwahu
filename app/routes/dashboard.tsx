import { requireSessionUser } from '~/session.server';

import type { LoaderFunction } from '@remix-run/node';
import type { Handle } from '~/types';

export const handle: Handle = {
  id: 'TopicsPage',
  thumbMenuItems: () => [
    {
      caption: `Onderwerpen`,
      to: '/topics',
      type: 'link',
    },
  ],
};

export const loader: LoaderFunction = async ({ request }) => {
  await requireSessionUser(request, { redirectTo: '/dashboard' });

  return {};
};

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
