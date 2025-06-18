import { useState, ReactNode } from "react";

export function Accordion({ children, type = "single", collapsible = false, className = "", ...props }: any) {
  return (
    <div className={"accordion " + className} {...props}>
      {children}
    </div>
  );
}

export function AccordionItem({ value, children, className = "", ...props }: any) {
  return (
    <div className={"rounded-xl overflow-hidden " + className} {...props}>
      {children}
    </div>
  );
}

export function AccordionTrigger({ children, className = "", onClick, ...props }: any) {
  return (
    <button
      className={"w-full py-4 px-2 text-left font-semibold flex items-center justify-between " + className}
      onClick={onClick}
      {...props}
      type="button"
    >
      {children}
    </button>
  );
}

export function AccordionContent({ children, className = "", open, ...props }: any) {
  return open ? (
    <div className={"px-4 pb-4 " + className} {...props}>
      {children}
    </div>
  ) : null;
}
