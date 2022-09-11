import { Link, useLoaderData } from '@remix-run/react';
import { getOrganisations } from '~/models/organisation.server';

import type { LoaderFunction } from '@remix-run/node';
import type { RouteMatch } from '@remix-run/react';
import type { Organisation } from '~/models/organisation.server';
import type { Handle, ThumbMenuItem } from 'types';

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
  organisations: Organisation[];
};

export const loader: LoaderFunction = async () => {
  const organisations = await getOrganisations();

  return { organisations };
};

export default function AdminOrganisations() {
  const { organisations } = useLoaderData<LoaderData>();

  // const abcOrganisations: {}[] = []

  // organisations.forEach(organisation => {
  //   if(abcOrganisations.includes(organisation.name.charAt(0)))
  // })

  return (
    <div>
      <h1>Organisaties</h1>
      <div className="p-2">
        {organisations.map((organisation) => (
          <Link
            className="rounded-lg border border-pink-800 p-1"
            key={organisation.id}
            to={organisation.id}
          >
            <p>{organisation.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
