import type { Prisma, PrismaClient } from '@prisma/client';

export const createOrganisation = async (
  db: PrismaClient,
  args: Prisma.OrganisationCreateArgs
) => {
  const organisation = await db.organisation.create(args);

  return organisation;
};

export const createOrganisations = async (
  db: PrismaClient,
  input: Prisma.OrganisationCreateInput[]
) => {
  try {
    const organisations = await Promise.all(
      input.map((data) => {
        return db.organisation.create({ data });
      })
    );
    return organisations;
  } catch (error) {
    return error;
  }
};
