import bcrypt from 'bcryptjs';

import type { PrismaClient } from '@prisma/client';
import type { UserRole } from '~/models/user.server';

export const createUser = async (
  db: PrismaClient,
  data: {
    firstName: string;
    lastName: string;
    email: string;
    initials?: string;
    role: UserRole;
  },
  password?: string
) => {
  return await db.user.create({
    data: {
      ...data,
      credentials: {
        create: password
          ? { passwordHash: await bcrypt.hash(password, 10) }
          : undefined,
      },
    },
  });
};

export const getUser = async (
  db: PrismaClient,
  args:
    | { id: string; email?: never }
    | {
        id?: never;
        email: string;
      }
) => {
  return db.user.findFirst({
    where: { OR: [{ id: args?.id }, { email: args?.email }] },
  });
};

export async function getUsers(db: PrismaClient) {
  return await db.user.findMany();
}

// export async function getUserSecureByEmailAndPassword({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }): Promise<UserSecure | null> {
//   const user = await getUser({ email });

//   if (!user) return null;

//   const isCorrectPassword = await bcrypt.compare(
//     password,
//     user.passwordHash ?? ''
//   );

//   if (!isCorrectPassword) return null;

//   const { passwordHash, ...userSecure } = user;

//   return userSecure;
// }

// export const getUsers = async (
//   args:
//     | {
//         organisationId: string;
//         organisationSlug?: never;
//       }
//     | { organisationId?: never; organisationSlug: string }
// ) => {
//   let users: {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//   }[] = [];

//   if (args.organisationId)
//     users = await db.user.findMany({
//       where: { organisationId: args.organisationId },
//       select: { id: true, firstName: true, lastName: true, email: true },
//     });

//   if (args.organisationSlug)
//     users = await db.user.findMany({
//       where: { organisation: { slug: args.organisationSlug } },
//       select: { id: true, firstName: true, lastName: true, email: true },
//     });

//   return { ...users.map((u) => userWithFullName(u)) };
// };

// export async function register({
//   firstName,
//   lastName,
//   initials,
//   email,
//   password,
// }: {
//   firstName: string;
//   lastName: string;
//   initials: string;
//   email: string;
//   password: string;
// }) {
//   const passwordHash = await bcrypt.hash(password, 10);
//   const emailValidationToken = nanoid(24);

//   // TODO: replace with real entry organisation
//   const organisationSlug = email.split('@').pop()?.split('.')[0];

//   return db.user.create();
// }

// export async function setPasswordResetToken(
//   db: PrismaClient,
//   { id }: { id: string }
// ) {
//   const user = await getUser(db, { id });
//   if (!user) throw new Error('User not found');

//   await db.read();

//   if (!db.data?.users) return;

//   db.data.users = db.data.users.map((u) =>
//     u.id === user.id ? { ...u, passwordResetToken: 'aaa' } : u
//   );
// }

// export async function sendPasswordResetEmailToUser({
//   email,
// }: {
//   email: string;
// }) {
//   const user = await getUser({ email });
//   if (!user) throw new Error('User not found');

//   await db.read();

//   if (!db.data?.users) return;

//   db.data.users = db.data.users.map((u) =>
//     u.id === user.id ? { ...u, passwordResetToken: 'aaa' } : u
//   );
// }
