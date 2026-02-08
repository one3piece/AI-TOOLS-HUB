import type { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "", ...props }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`} {...props}>
      {children}
    </div>
  );
}
