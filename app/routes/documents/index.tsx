import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getDocuments } from '~/services/document.server';

import type { LoaderFunction } from '@remix-run/node';
import { db } from '~/utils/db.server';

type LoaderData = {
  documents: Awaited<ReturnType<typeof getDocuments>>;
};

export const loader: LoaderFunction = async ({ params }) => {
  const documents = await getDocuments(db);

  return json<LoaderData>({ documents });
};

export default function Documents() {
  const { documents } = useLoaderData<LoaderData>();

  return (
    <div className="flex h-full flex-col border-4 border-green-400">
      <h1>Documenten</h1>
      <div className="w-1/2 flex-1 border-4 border-red-400 p-2">
        {documents.map((document) => (
          <Link key={document.id} to={document.id}>
            <li>{document.long}</li>
          </Link>
        ))}
      </div>
    </div>
  );
}
