import { Link } from "@remix-run/react";
import { FC } from "react";

export const Header: FC<{
  backButton?: { caption: string; to: string };
  title: string;
}> = ({ backButton, title }) => {
  return (
    <div className="mb-4 flex border-b-2 border-blue-800 lg:mb-8">
      {backButton && (
        <Link
          to={backButton.to}
          className="top-4 mr-2 h-8 w-8 rounded-full bg-blue-600 py-1 px-2 text-white hover:bg-blue-700 lg:absolute"
        >
          {`<`}
          <p className="hidden">{backButton.caption}</p>
        </Link>
      )}
      <div className="">
        <h1>{title}</h1>
      </div>
    </div>
  );
};
