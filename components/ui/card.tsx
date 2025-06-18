import { ReactNode } from "react";

export function Card({ children, className = "", ...props }: any) {
  return (
    <div className={"rounded-2xl bg-white/5 shadow-lg border border-slate-700/40 " + className} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }: any) {
  return (
    <div className={"p-6 pb-2 " + className} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", ...props }: any) {
  return (
    <h3 className={"text-lg font-bold mb-1 " + className} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = "", ...props }: any) {
  return (
    <p className={"text-gray-400 text-sm " + className} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = "", ...props }: any) {
  return (
    <div className={"px-6 pb-6 pt-2 " + className} {...props}>
      {children}
    </div>
  );
}
