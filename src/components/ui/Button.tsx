import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  arrow?: boolean;
}

export function Button({ children, variant = "primary", arrow = false, className = "", ...props }: ButtonProps) {
  return (
    <a className={`button button-${variant} ${className}`} {...props}>
      <span>{children}</span>
      {arrow && <ArrowUpRight aria-hidden="true" size={18} weight="bold" />}
    </a>
  );
}
