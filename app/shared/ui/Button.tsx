import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-stone-50 ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
