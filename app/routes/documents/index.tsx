import { ActionFunction, json } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { getDocuments, searchDocuments } from '~/services/document.server';

import type { LoaderFunction } from '@remix-run/node';
import { db } from '~/utils/db.server';

type LoaderData = {
  documents: Awaited<ReturnType<typeof getDocuments>>;
  searchedDocuments: Awaited<ReturnType<typeof searchDocuments>>;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const documents = await getDocuments(db);

  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const searchedDocuments = await searchDocuments(db, {
    terms: String(searchParams.get('search')).split(' '),
  });

  return json<LoaderData>({ documents, searchedDocuments });
};

export default function Documents() {
  const { documents, searchedDocuments } = useLoaderData<LoaderData>();

  return (
    <div className="flex h-full flex-col gap-4 p-8">
      <div className="rounded-lg bg-gray-300 p-4">
        <h1>Documenten</h1>
      </div>
      <div className="grid flex-1 grid-cols-8 gap-4">
        <div className="col-span-2 flex flex-col gap-4">
          <div className="border-grey-300 flex h-1/2 flex-col rounded-lg border p-2">
            Documenten
            {documents.map((document) => (
              <Link key={document.id} to={document.id}>
                <li>{document.instruction}</li>
              </Link>
            ))}
          </div>

          <div className="flex-1 rounded-lg bg-gray-300">Favorieten</div>
        </div>
        <div className="col-span-4 flex flex-col gap-4">
          <div className="flex flex-col items-center gap-2 py-4">
            <h1>Zoeken</h1>
            <Form className="relative flex items-center text-xl">
              <input
                className="mr-2 rounded-md border border-sky-500 py-1 pl-2 pr-8 text-lg drop-shadow-md"
                type="text"
                name="search"
                id="search"
              />
              <label htmlFor="search">
                <i className="fas fa-search text-sky-500 drop-shadow-md"></i>
              </label>
              <button className="relative -left-14 text-gray-300">
                <i className="fas fa-circle-xmark"></i>
              </button>
            </Form>
          </div>
          <div className="rounded-lg bg-gray-300">
            Zoekresultaten:
            {searchedDocuments.map((doc) => (
              <h1>{doc.instruction}</h1>
            ))}
          </div>
        </div>
        <div className="col-span-2 rounded-lg bg-gray-200 p-2 drop-shadow-md">
          Favorieten
        </div>
      </div>
    </div>
  );
}
