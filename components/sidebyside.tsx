import type { ReactNode } from 'react';

export function SideBySide({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 items-start">
      {children}
    </div>
  );
}
