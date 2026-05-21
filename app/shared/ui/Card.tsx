import type { PropsWithChildren } from "react";

export function Card({ children }: PropsWithChildren) {
  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-8">
      {children}
    </div>
  );
}
