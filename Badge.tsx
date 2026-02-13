import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
  className?: string;
}

const variants = {
  default: "bg-neutral-900 text-white",
  secondary: "bg-neutral-100 text-neutral-700",
  outline: "border border-neutral-300 bg-transparent text-neutral-700",
};

export function Badge({ children, variant = "default", className = "", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
