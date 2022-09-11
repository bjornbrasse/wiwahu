import { json, redirect } from '@remix-run/node';
import { getOrganisation } from '~/models/organisation.server';

import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

type LoaderData = {
  organisation: Exclude<Awaited<ReturnType<typeof getOrganisation>>, null>;
};

export const loader: LoaderFunction = async ({ params }) => {
  const organisation = await getOrganisation({
    id: params?.organisationId ?? '',
  });

  if (!organisation) return redirect('/admin/organisations');

  return json<LoaderData>({ organisation });
};

export default function Organisation() {
  const { organisation } = useLoaderData<LoaderData>();

  return (
    <div>
      <h1>{organisation.name}</h1>
    </div>
  );
}
