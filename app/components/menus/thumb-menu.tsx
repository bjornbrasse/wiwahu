import { Link, NavLink } from 'react-router-dom';

import type { FC } from 'react';
import type { ThumbMenuItem } from '~/types';

export const ThumbMenu: FC<{
  menuItems?: ThumbMenuItem[];
}> = ({ menuItems }) => (
  <>
    {menuItems && (
      <div className="flex h-16 justify-evenly border-t border-primary-text">
        {menuItems?.map((menuItem, index) => {
          console.log('komt dit 2 keer?', menuItem);
          if (menuItem.type === 'link')
            return (
              <Link
                className="border-4 border-pink-500"
                key={index}
                to={menuItem.to}
              >
                <p>{menuItem.caption}</p>
              </Link>
            );
          if (menuItem.type === 'navlink')
            return (
              <NavLink
                className={({ isActive }) =>
                  `border-4 border-pink-500 ${isActive ? 'bg-red-400' : null}`
                }
                key={index}
                to={menuItem.to}
              >
                <p>{menuItem.caption}</p>
              </NavLink>
            );
          return <p key={index}>Twee keer?</p>;
        })}
      </div>
    )}
  </>
);
