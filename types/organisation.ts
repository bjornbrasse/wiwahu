import type {
  Organisation as PrismaOrganisation,
  Prisma,
} from '@prisma/client';

export type Organisation = PrismaOrganisation;

/**
 * OrganisationUncheckedCreateInput with specific OrganisationType
 */
// export type OrganisationUncheckedCreateInput =
//   Prisma.OrganisationCreateInput & {
//     type: OrganisationType;
//     version: `${number}.${number}.${number}`;
//   };
