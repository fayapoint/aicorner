import { clsx } from "clsx";
import { ReactNode } from "react";

export function Badge({ children, className = "", variant = "default", ...props }: any) {
  const base = "inline-flex items-center font-semibold rounded-full px-3 py-1 text-xs border transition-all duration-200";
  const variants: Record<string, string> = {
    default: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    secondary: "bg-slate-700/50 text-gray-300 border-slate-600/60",
  };
  return (
    <span className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
