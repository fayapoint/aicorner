import { clsx } from "clsx";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
}

const variantClasses = {
  default: "bg-purple-600 hover:bg-purple-700 text-white",
  outline: "border border-purple-500 text-purple-400 bg-transparent hover:bg-purple-500/10",
  ghost: "bg-transparent hover:bg-purple-500/10 text-purple-400",
  secondary: "bg-slate-700 hover:bg-slate-600 text-white",
};

const sizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-8 py-4 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        "rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400/60",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
