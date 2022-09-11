import type { FC } from 'react';

export const Section: FC<{ title: string }> = ({ children, title }) => {
  return (
    <div>
      <div className="sticky top-0 rounded-md border border-primary bg-secondary p-2">
        {title}
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
};
