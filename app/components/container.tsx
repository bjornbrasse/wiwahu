import { FC } from "react";

export const Container: FC = ({ children }) => {
  return (
    <div className="relative h-full overflow-hidden bg-slate-300 p-4 lg:p-20">
      {children}
    </div>
  );
};
