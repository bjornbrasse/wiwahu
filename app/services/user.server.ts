import bcrypt from 'bcryptjs';

import type { PrismaClient } from '@prisma/client';
import type { UserData, UserRole } from '~/models/user.server';

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

// export const getUser = async (
//   args:
//     | { id: string; email?: never; passwordResetToken?: never }
//     | {
//         id?: never;
//         email: string;
//         passwordResetToken?: never;
//       }
//     | { id?: never; email?: never; passwordResetToken: string }
//     | { id?: never; email: string; passwordResetToken?: never }
// ) => {
//   await db.read();

//   if (args?.id) {
//     // return await db.user.findFirst({ where: { id: args.id } });
//     return await db.data?.users?.find((user) => user.id === args.id);
//   }

//   if (args?.email) {
//     return await db.data?.users?.find((user) => user.email === args.email);
//   }

//   if (args?.passwordResetToken)
//     return await db.data?.users.find(
//       (user) => user.passwordResetToken === args.passwordResetToken
//     );
// };

// export async function getUsers() {
//   await db.read();
//   const users = db.data?.users ?? [];
//   return users;
// }

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

// export async function setPasswordResetToken({ id }: { id: string }) {
//   const user = await getUser({ id });
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
