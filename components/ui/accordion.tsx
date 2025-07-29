"use client"

import { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export function Accordion({ children, type = "single", collapsible = false, className = "", ...props }: any) {
  return (
    <div className={`accordion space-y-2 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function AccordionItem({ value, children, className = "", ...props }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`rounded-xl overflow-hidden ${className}`} {...props}>
      {children.map((child: any, index: number) => {
        if (child.type === AccordionTrigger) {
          return {
            ...child,
            props: {
              ...child.props,
              onClick: () => setIsOpen(!isOpen),
              isOpen
            }
          };
        }
        if (child.type === AccordionContent) {
          return {
            ...child,
            props: {
              ...child.props,
              open: isOpen
            }
          };
        }
        return child;
      })}
    </div>
  );
}

export function AccordionTrigger({ children, className = "", onClick, isOpen, ...props }: any) {
  return (
    <button
      className={`w-full py-4 px-6 text-left font-semibold flex items-center justify-between hover:bg-slate-700/30 transition-colors ${className}`}
      onClick={onClick}
      {...props}
      type="button"
    >
      {children}
      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
}

export function AccordionContent({ children, className = "", open, ...props }: any) {
  return open ? (
    <div className={`px-6 pb-4 ${className}`} {...props}>
      {children}
    </div>
  ) : null;
}