import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { User } from "~/models/user.server";
import { getUser } from "~/models/user.server";

type LoaderData = {
  user: User;
};

export const loader: LoaderFunction = async ({ params }) => {
  const user = await getUser({ id: params.userId ?? "" });

  if (!user) return redirect("/admin/users");

  return json<LoaderData>({ user });
};

export default function UserPage() {
  const { user } = useLoaderData<LoaderData>();

  return (
    <div>
      <h1>User</h1>
      <p>{user.firstName}</p>
    </div>
  );
}
