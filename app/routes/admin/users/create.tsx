import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Field } from "~/components/form-elements";
import { createUser } from "~/models/user.server";

export const action: ActionFunction = async ({ request }) => {
  const { firstName, lastName, email, password } = Object.fromEntries(
    await request.formData()
  );

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  )
    return redirect("/admin/users");

  const user = createUser({ firstName, lastName, email, password });

  return { user };
};

export default function CreateUserPage() {
  return (
    <div>
      <Form className="p-2" method="post">
        <Field label="Voornaam" name="firstName"></Field>
        <Field label="Achternaam" name="lastName"></Field>
        <Field label="Email" name="email"></Field>
        <Field label="Wachtwoord" name="password"></Field>
        <button className="btn btn-save" type="submit">
          Opslaan
        </button>
      </Form>
    </div>
  );
}
