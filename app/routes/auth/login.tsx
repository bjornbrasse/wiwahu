import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import { badRequest } from '~/utils/badRequest';
import { createUserSession } from '~/session.server';
import { Field } from '~/components/form-elements';
import {
  getUser,
  getUserSecureByEmailAndPassword,
  User,
} from '~/models/user.server';
import { z } from 'zod';
import dayjs from 'dayjs';
import { sendEmail, loginEmail } from '~/utils/email';
import { customRandom, urlAlphabet, random } from 'nanoid';

import type { ActionFunction } from '@remix-run/node';
import type { inferSafeParseErrors } from '~/types';

const schema = z.object({
  _type: z.enum(['link', 'password']),
  email: z.string().email(),
  password: z.string().min(1, { message: 'provide a password' }).optional(),
  redirectTo: z.string().optional(),
});

type ActionData = {
  fields?: z.infer<typeof schema>;
  errors?: inferSafeParseErrors<typeof schema>;
};

export const action: ActionFunction = async ({ request }) => {
  console.log('KOMT HIER????******* ');

  const result = schema.safeParse(Object.fromEntries(await request.formData()));

  if (!result.success) {
    return badRequest<ActionData>({ errors: result.error.flatten() });
  }

  // const user = result.data?.password
  //   ? await getUser({ email: result.data.email })
  //   : await getUserSecureByEmailAndPassword({
  //       email: result.data.email,
  //       password: result.data.password ?? '',
  //     });

  // if (!user) {
  //   // return badRequest<ActionData>({
  //   return badRequest({
  //     // fields: result.data,
  //     errors: { formErrors: [`Email/Password combination is incorrect`] },
  //   });
  // }

  // if (result.data._type === 'link') {
  //   const token = customRandom(urlAlphabet, 48, random)();
  //   await sendEmail(
  //     [result.data.email],
  //     loginEmail(user.firstName, token),
  //     `Topico Login on ${dayjs().format('DD MM')}`
  //   );

  //   return {};
  // }

  if (result.data._type === 'password') {
    const url = new URL(request.url);
    const redirectUrl = url.searchParams.get('redirectTo') ?? '/dashboard';

    const user = await User.init(result.data.email);

    if (await user.passwordIsValid(result.data.password ?? '')) {
      console.log('password is juist');

      return createUserSession({
        request,
        userId: user.id,
        // TODO: make this option on form https://github.com/remix-run/blues-stack/blob/ccf90238597016a11f2cfd499e383456716f1a8d/app/routes/login.tsx
        // remember: remember === "on" ? true : false,
        remember: false,
        redirectTo: '/dashboard',
      });
    }
  }

  return badRequest<ActionData>({ errors: { formErrors: ['Big error'] } });
};

export default function LoginPage() {
  // const data = useActionData() as ActionData;
  const data = useActionData();
  const [searchParams] = useSearchParams();

  // const { openDialog } = useDialog();

  // const passwordResetHandler: EventHandler<React.SyntheticEvent> = (e) => {
  //   e.preventDefault();
  //   console.log('jajaj');
  //   openDialog('test', <RequestPasswordResetForm />, 'hoi');
  // };

  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <img
        className="flex-1 object-cover brightness-125 md:object-fill"
        src="../beach.jpeg"
        alt="Landscape"
      />
      <div
        className="card absolute flex flex-col justify-center border border-primary-text bg-white/80 p-12 dark:bg-gray-900 md:w-1/2"
        data-light=""
      >
        <Form
          aria-describedby={
            data?.errors?.formErrors ? 'form-error-message' : undefined
          }
          method="post"
          noValidate
        >
          <div>
            <Field
              id="email"
              label="Email"
              name="email"
              error={data?.errors?.fieldErrors?.email}
            />
          </div>
          <div className="flex divide-x-2 divide-blue-700 border-t-2 border-blue-700">
            <div className="w-1/2 p-4 pr-8">
              <div className="flex">
                <div className="square flex w-8 items-center justify-center rounded-full border border-gray-500 text-xl text-gray-500">
                  1
                </div>
                <span>Inloggen met link</span>
              </div>
              <button
                className="btn btn-save"
                type="submit"
                name="_type"
                value="link"
              >
                Stuur mij een Link
              </button>
            </div>
            <div className="w-1/2 pl-8">
              <h1 className="mb-4 text-center text-xl text-primary">Login</h1>
              <Field
                label="Password"
                name="password"
                type="password"
                error={data?.errors?.fieldErrors?.password}
              />
              <div className="flex items-center">
                <label className="mr-2" htmlFor="rememberMe">
                  Remember me
                </label>
                <input
                  className="h-4 w-4"
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                />
              </div>
              <div id="form-error-message">
                {data?.errors?.formErrors ? (
                  <p className="form-validation-error" role="alert">
                    {data?.errors?.formErrors.join(',')}
                  </p>
                ) : null}
              </div>
              <button
                className="btn btn-save inline-block border border-white"
                name="_type"
                type="submit"
                value="password"
              >
                Submit
              </button>
              <p className="mt-2">
                Forgot password?{' '}
                <Link to="/auth/requestPasswordReset" className="underline">
                  Reset Password
                </Link>
              </p>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
