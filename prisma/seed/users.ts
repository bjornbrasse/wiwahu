import type { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { createUser } from '~/services/user.server';
// import { faker } from '@faker-js/faker';

// const genUsers = async () => {
//   const arr: Omit<UserData, 'organisationId'>[] = [];

//   for (let i = 0; i < 100; i++) {
//     const firstName = faker.name.firstName();
//     const lastName = faker.name.lastName();

//     arr.push({
//       firstName,
//       lastName,
//       email: faker.internet.email(
//         firstName,
//         lastName + i.toString(),
//         'rooster.nl'
//       ),
//       passwordHash: await bcrypt.hash('user', 10),
//     });
//   }

//   return arr;
// };

// export type NewAdminUserData = {
//   role: string;
//   firstName: string;
//   lastName: string;
//   initials: string;
//   email: string;
//   passwordHash: string;
// };

// export type UserData = Pick<
//   User,
//   'firstName' | 'lastName' | 'email' | 'passwordHash'
// > & {
//   organisationId: string;
//   // defaultDepartmentSlug: string;
//   // defaultTeamSlug: string;
// } & Partial<User>;

export async function seedAdminUser({
  db,
}: {
  db: PrismaClient;
}): Promise<User> {
  // return await db.user.create({
  //   data: {
  //     firstName: 'Bjorn',
  //     lastName: 'Brassé',
  //     initials: 'BB',
  //     email: 'admin@rooster.nl',
  //     role: 'ADMIN',
  //     credentials: { create: { passwordHash: await bcrypt.hash('admin', 10) } },
  //   },
  // });
  return await createUser(
    db,
    {
      firstName: 'Bjorn',
      lastName: 'Brassé',
      initials: 'BB',
      email: 'admin@rooster.nl',
      role: 'admin',
    },
    'admin'
  );
}

// export async function seedUsers({
//   db,
//   organisations,
// }: {
//   db: PrismaClient;
//   organisations: Organisation[];
// }): Promise<User[]> {
//   const userData: UserData[] = await (async () => [
//     {
//       email: 'barbara@rooster.nl',
//       firstName: 'Barbara',
//       lastName: 'Jansen',
//       passwordHash: await bcrypt.hash('barbara', 10),
//       organisationId: organisations[0].id,
//     },
//     {
//       email: 'mark@rooster.nl',
//       firstName: 'Mark',
//       lastName: 'Nieuwlaat',
//       passwordHash: await bcrypt.hash('mark', 10),
//       organisationId: organisations[0].id,
//     },
//     {
//       email: 'tessa@etz.nl',
//       firstName: 'Tessa',
//       lastName: 'Leenders',
//       passwordHash: await bcrypt.hash('etz', 10),
//       organisationId: organisations[0].id,
//     },
//     {
//       email: 'marieke@cze.nl',
//       firstName: 'Marieke',
//       lastName: 'Kerskes',
//       passwordHash: await bcrypt.hash('cze', 10),
//       organisationId: organisations[1].id,
//     },
//   ])();

//   return await Promise.all(
//     // userData.map(({ organisationId, ...user }) => {
//     (
//       await genUsers()
//     ).map((user) => {
//       return db.user.create({
//         data: {
//           ...user,
//           organisation: { connect: { id: organisations[1].id } },
//         },
//       });
//     })
//   );
// }
