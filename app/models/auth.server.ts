import { createCookieSessionStorage, redirect } from '@remix-run/node';
// import type { User } from "@prisma/client";
// import bcrypt from "bcrypt";
import { customRandom, random, urlAlphabet } from 'nanoid';
import { getSessionUserId } from '~/session.server';
// import { db } from "../utils/db.server";
import { db } from '~/utils/lowdb.server';
import { getUser, User, UserSecure } from './user.server';

// import { sendEmail } from "~/utils/email";
// import { passwordResetEmail } from "~/utils/email/templates";
// import { badRequest } from "~/utils/helpers";

const USER_SESSION_KEY = 'userId';

const sessionIdKey = '__session_id__';

// export async function getUserPasswordReset({ email }: { email: string }) {
//   const passwordResetToken = customRandom(urlAlphabet, 48, random)();

//   const user = await db.user.update({
//     where: { email },
//     data: { passwordResetToken },
//     select: { firstName: true, email: true, passwordResetToken: true },
//   });

//   return user;
// }

// export async function setPasswordResetToken(
//   args: { email: string; userId?: never } | { email?: never; userId: string }
// ): Promise<
//   { success: true; user: Omit<User, "passwordHash"> } | { success: false }
// > {
//   const passwordResetToken = customRandom(urlAlphabet, 48, random)();

//   const user = await db.user.update({
//     where: { email: args?.email, id: args?.userId },
//     data: { passwordResetToken },
//   });

//   if (!user) return { success: false };

//   return { success: true, user };
// }

export async function getSessionUserSecure(
  request: Request
): Promise<UserSecure | null> {
  const userId = await getSessionUserId(request);

  if (!userId) return null;

  const user = await getUser({ id: userId });

  if (!user) return null;

  const {
    // emailValidationToken,
    passwordHash,
    passwordResetToken,
    passwordResetTokenExpirationDate,
    ...userSecure
  } = user;

  return userSecure;
}

// export async function logout(request: Request) {
//   const session = await storage.getSession(request.headers.get("Cookie"));
//   return redirect("/auth/login", {
//     headers: {
//       "Set-Cookie": await storage.destroySession(session),
//     },
//   });
// }

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

// export async function requireUserId(
//   request: Request,
//   options: { redirectTo?: string } = { redirectTo: "/" }
// ): Promise<string> {
//   const userId = await getUserId(request);

//   if (!userId) throw redirect(options.redirectTo!);

//   return userId;
// }

// export async function requireUser(
//   request: Request,
//   options: { isAdmin?: boolean; redirectTo?: string } = {
//     redirectTo: "/auth/login",
//   }
// ): Promise<UserSecure> {
//   const user = await getUserSecure(request);

//   if (!user) throw redirect(`/auth/login?redirectTo=${options.redirectTo}`);

//   if (options.isAdmin) {
//     if (user.role !== "ADMIN") throw redirect(options.redirectTo!);
//   }

//   return user;
// }

// export async function resetPassword({
//   email,
//   newPassword,
// }: {
//   email: string;
//   newPassword: string;
// }) {
//   const passwordHash = await bcrypt.hash(newPassword, 10);

//   const user = await db.user.update({
//     where: { email },
//     data: { passwordHash, passwordResetToken: "" },
//   });
//   if (!user) return null;

//   return user;
// }

// export async function setPasswordResetToken(
//   args: { email: string; userId?: never } | { email?: never; userId: string }
// ): Promise<
//   { success: true; user: Omit<User, 'passwordHash'> } | { success: false }
// > {
//   const passwordResetToken = customRandom(urlAlphabet, 48, random)();

//   const user = await db.user.update({
//     where: { email: args?.email, id: args?.userId },
//     data: { passwordResetToken },
//   });

//   if (!user) return { success: false };

//   return { success: true, user };
// }
