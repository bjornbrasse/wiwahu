import type { User as PrismaUser } from '@prisma/client';

export type UserRole = 'admin' | 'super-admin' | 'user';

export type User = PrismaUser & { role: UserRole };

export type UserData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export type WithFullName<T> = T & {
  fullName: string;
  initials: string;
};

export function userWithFullName<
  User extends { firstName: string; lastName: string; email: string }
>(user: User): WithFullName<User> {
  // if (!user) return null;

  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
    initials:
      user.firstName.charAt(0).toUpperCase() +
      user.lastName.charAt(0).toUpperCase(),
  };
}

// export class User {
//   constructor(readonly _email: string, readonly _id: string) {}

//   public async passwordIsValid(password: string) {
//     const user = await getUser({ email: this.email });

//     if (!user) return false;

//     return await bcrypt.compare(password, user.passwordHash ?? '');
//   }

//   get email() {
//     return this._email;
//   }

//   public static init = async (email: string) => {
//     const user = await getUser({ email });

//     if (!user) throw new Error('unknown');

//     return new User(user.email, user.id);
//   };
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
