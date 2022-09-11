import { FC } from "react";
import { Link, NavLink } from "react-router-dom";

export const MenuView: FC<{
  menuItems: {
    caption: string;
    to: string;
    type: "button" | "link" | "navlink";
  }[];
}> = ({ children, menuItems }) => {
  return (
    <div className="flex h-full flex-col border-2 border-purple-500">
      <div className="flex-1">{children}</div>
      <div id="menu" className="flex h-16 justify-evenly bg-white">
        {menuItems.map(({ caption, to, type }) => {
          if (type === "link")
            return (
              <Link className="border-4 border-pink-500" to={to}>
                <p>{caption}</p>
              </Link>
            );
          if (type === "navlink")
            return (
              <NavLink className="border-4 border-pink-500" to={to}>
                <p>{caption}</p>
              </NavLink>
            );
        })}
      </div>
    </div>
  );
};
