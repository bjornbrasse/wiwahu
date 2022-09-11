import React from 'react';
import { Link } from '@remix-run/react';

import type { FC } from 'react';

export const DrawerMenu: FC<{
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowMenu }) => {
  return (
    <div className="absolute top-0 left-0 z-20 flex h-full w-56 flex-col border-2 border-red-600 bg-white">
      <h2 className="self-center">Menu</h2>
      <div className="flex flex-col divide-y divide-blue-600">
        {[
          {
            caption: 'Dashboard',
            icon: 'fas fa-times',
            to: '/dashboard',
          },
          {
            caption: 'Onderwerpen',
            icon: 'fas fa-times',
            to: '/topics',
          },
        ].map(({ caption, icon, to }, index) => (
          <Link
            className="p-2 text-lg font-bold hover:scale-95"
            key={index}
            to={to}
            onClick={() => setShowMenu(false)}
          >
            {caption}
          </Link>
        ))}
      </div>
    </div>
  );
};
