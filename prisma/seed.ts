import { PrismaClient } from '@prisma/client';
// import { seedOrganisations } from './seed/organisations';
// import { seedAdminUser, seedUsers } from './seed/users';
import { seedAdminUser } from './seed/users';

const db = new PrismaClient();

async function seed() {
  const adminUser = await seedAdminUser({ db });

  // const organisations = await seedOrganisations({ db, adminUser });

  // await seedUsers({ db, organisations });
}

seed();
