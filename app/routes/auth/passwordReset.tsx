import { json, redirect } from '@remix-run/node';
import { useActionData, useLoaderData } from '@remix-run/react';
import { badRequest } from '~/utils/badRequest';
import { createUserSession } from '~/session.server';
import { getUser, setPasswordResetToken } from '~/models/user.server';
import { Field } from '~/components/form-elements';
import { z } from 'zod';

import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import type { inferSafeParseErrors } from '~/types';

type LoaderData = {
  email: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const token = new URL(request.url).searchParams.get('token');

  // const user = await db.user.findFirst({
  //   where: { passwordResetToken: String(token) },
  // });

  // if (!user) return redirect('/auth/login');

  // return { email: user.email };
  return json<LoaderData>({ email: token ?? 'lul' });
};

const schema = z.object({
  password: z.string().trim().min(6, { message: 'Wrong' }),
  passwordConfirm: z.string().trim(),
});

type ActionData = {
  fields?: z.input<typeof schema>;
  errors?: inferSafeParseErrors<typeof schema>;
};

export const action: ActionFunction = async ({ request }) => {
  const token = new URL(request.url).searchParams.get('token');

  const user = await getUser({ passwordResetToken: token ?? '' });

  if (!user) return redirect('/login');

  const result = schema.safeParse(Object.fromEntries(await request.formData()));

  if (!result.success) {
    return badRequest<ActionData>({ errors: result.error.flatten() });
  }

  const { password, passwordConfirm } = result.data;

  if (password !== passwordConfirm)
    return badRequest<ActionData>({
      errors: { formErrors: ['Passwords do not match'] },
    });

  // return createUserSession({
  //   request,
  //   userId: user.id,
  //   remember: false,
  //   redirectTo: '/',
  // });
  return {};
};

export default function PasswordResetPage() {
  const { email } = useLoaderData<LoaderData>();
  const actionData = useActionData();

  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden border-4 border-purple-600">
      <img
        className="w-full flex-1 object-cover brightness-125 md:object-fill"
        src="../password.jpeg"
        alt="Landscape"
      />
      <div className="absolute flex w-3/4 flex-col rounded-lg border border-blue-800 bg-white/80 p-4 text-blue-800 sm:w-6/12 md:w-96">
        <p className="mb-4">Wachtwoord resetten</p>
        <form method="POST">
          <Field
            label="Nieuw wachtwoord"
            name="password"
            type="password"
            aria-describedby={
              actionData?.fieldErrors?.password ? 'password-error' : undefined
            }
            aria-invalid={
              Boolean(actionData?.fieldErrors?.password) || undefined
            }
          />
          <Field
            label="Bevestig wachtwoord"
            name="passwordConfirm"
            type="password"
            aria-describedby={
              actionData?.fieldErrors?.password ? 'password-error' : undefined
            }
            aria-invalid={
              Boolean(actionData?.fieldErrors?.password) || undefined
            }
          />

          <button type="submit" className="btn btn-save mt-4 w-full">
            Verander wachtwoord
          </button>
        </form>
      </div>
    </div>
  );
}
