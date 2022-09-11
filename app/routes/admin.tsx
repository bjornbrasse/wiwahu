import { NavLink, Outlet } from '@remix-run/react';

import type { FC } from 'react';

const Button: FC<{ caption: string; to: string }> = ({ caption, to }) => (
  <NavLink
    className={({ isActive }) =>
      `rounded-lg border border-blue-600 p-1 ${
        isActive ? 'bg-blue-700 text-white' : 'text-blue-600'
      }`
    }
    to={to}
  >
    {caption}
  </NavLink>
);

export default function AdminLayout() {
  return (
    <div className="flex h-full flex-col border-2 border-emerald-400">
      <div className="flex space-x-2 p-2">
        {[
          { caption: 'Users', to: 'users' },
          { caption: 'Organisations', to: 'organisations' },
          { caption: 'Topics', to: 'topics' },
        ].map(({ caption, to }, index) => (
          <Button caption={caption} to={to} key={index} />
        ))}
      </div>
      <div className="flex-1 border-4 border-rose-800">
        <Outlet />
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="flex h-full items-center justify-center border-2 border-red-700">
      <h1>Er is een fout opgetreden!</h1>
      <p>{error.message}</p>
    </div>
  );
}
