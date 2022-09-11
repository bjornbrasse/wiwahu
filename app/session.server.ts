import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { getUser } from '~/models/user.server';

import type { TUser } from '~/models/user.server';

// import { sendEmail } from "~/utils/email";
// import { passwordResetEmail } from "~/utils/email/templates";

// import type { User } from "@prisma/client";

const USER_SESSION_KEY = 'userId';

const sessionIdKey = '__session_id__';

// TODO: Maken: ENV lijkt niet te werken, nu bypass
// const sessionSecret = process.env.SESSION_SECRET;
const sessionSecret = process.env.SESSION_SECRET ?? '123456789';
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    name: '__session',
    path: '/',
    sameSite: 'lax',
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function useSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );
  const initialValue = await sessionStorage.commitSession(session);

  const getSessionId = () => session.get(sessionIdKey) as string | undefined;

  const unsetSessionId = () => session.unset(sessionIdKey);

  const commit = async () => {
    const currentValue = await sessionStorage.commitSession(session);
    return currentValue === initialValue ? null : currentValue;
  };

  return {
    session,
    // getUser: async () => {
    //   const token = getSessionId()
    //   if (!token) return null

    //   return getUserFromSessionId(token).catch((error: unknown) => {
    //     unsetSessionId()
    //     console.error(`Failure getting user from session ID:`, error)
    //     return null
    //   })
    // },
    getSessionId,
    unsetSessionId,
    // signIn: async (user: Pick<User, 'id'>) => {
    //   const userSession = await createSession({userId: user.id})
    //   session.set(sessionIdKey, userSession.id)
    // },
    // signOut: () => {
    //   const sessionId = getSessionId()
    //   if (sessionId) {
    //     unsetSessionId()
    //     prismaWrite.session
    //       .delete({where: {id: sessionId}})
    //       .catch((error: unknown) => {
    //         console.error(`Failure deleting user session: `, error)
    //       })
    //   }
    // },
    commit,
    /**
     * This will initialize a Headers object if one is not provided.
     * It will set the 'Set-Cookie' header value on that headers object.
     * It will then return that Headers object.
     */
    getHeaders: async (headers: ResponseInit['headers'] = new Headers()) => {
      const value = await commit();
      if (!value) return headers;
      if (headers instanceof Headers) {
        headers.append('Set-Cookie', value);
      } else if (Array.isArray(headers)) {
        headers.push(['Set-Cookie', value]);
      } else {
        headers['Set-Cookie'] = value;
      }
      return headers;
    },
  };
}

export async function createUserSession({
  request,
  userId,
  remember,
  redirectTo = '/',
}: {
  request: Request;
  userId: string;
  remember: boolean;
  redirectTo?: string;
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}

export function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get('Cookie'));
}

export async function getSessionUserId(request: Request) {
  const session = await getSession(request);
  const userId = session.get('userId');

  return userId && typeof userId === 'string' ? userId : null;
}

type UserSecure = Omit<TUser, 'passwordHash'>;

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
    // passwordResetToken,
    ...userSecure
  } = user;

  return userSecure;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await getUser({ email });

  if (!user) return null;

  const { passwordHash, ...userWithoutPasswordHash } = user;

  // const isCorrectPassword = await bcrypt.compare(password, passwordHash ?? "");
  // if (!isCorrectPassword) return null;

  // return userWithoutPasswordHash;

  return password === passwordHash ? userWithoutPasswordHash : null;
}

export async function logout(
  request: Request,
  options?: { redirectTo?: string }
) {
  const session = await getSession(request);
  return redirect(options?.redirectTo ?? '/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}

export async function requireSessionUserId(
  request: Request,
  options: { isAdmin?: boolean; redirectTo?: string } = {
    redirectTo: '/auth/login',
  }
): Promise<string> {
  const userId = await getSessionUserId(request);

  if (!userId) throw redirect(options.redirectTo!);

  return userId;
}

export async function requireSessionUser(
  request: Request,
  options: { isAdmin?: boolean; redirectTo?: string }
): Promise<UserSecure> {
  const user = await getSessionUserSecure(request);

  if (!user) throw redirect(`/auth/login?redirectTo=${options.redirectTo}`);

  if (options.isAdmin) {
    if (user.isAdmin !== true) {
      if (options?.redirectTo)
        throw redirect(options.redirectTo ?? '/auth/login');
    }
  }

  return user;
}

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
