import { nanoid } from 'nanoid';
import { db } from '~/utils/lowdb.server';

export type Organisation = {
  id: string;
  name: string;
  nameShort?: string;
  slug: string;
  emailDomain: string;
};

export const createOrganisation = async (data: Omit<Organisation, 'id'>) => {
  const organisation = { id: nanoid(), ...data };

  await db.read();
  db.data?.organisations?.push(organisation);
  await db.write();

  return organisation;
};

export const getOrganisation = async ({ id }: { id: string }) => {
  await db.read();
  return (
    db.data?.organisations.find((organisation) => organisation.id === id) ??
    null
  );
};

export const getOrganisations = async () => {
  await db.read();
  return db.data?.organisations ?? [];
};
