import { useState, ReactNode } from "react";

export function Tabs({ children, defaultValue, value, onValueChange, className = "", ...props }: any) {
  const [activeTab, setActiveTab] = useState(defaultValue || value);
  
  const handleTabChange = (newValue: string) => {
    setActiveTab(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <div className={`tabs ${className}`} {...props}>
      {children}
    </div>
  );
}

export function TabsList({ children, className = "", ...props }: any) {
  return (
    <div className={`flex space-x-1 rounded-lg bg-slate-800/50 p-1 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function TabsTrigger({ children, value, className = "", ...props }: any) {
  return (
    <button
      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-slate-700/50 data-[state=active]:bg-slate-700 data-[state=active]:text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value, className = "", ...props }: any) {
  return (
    <div className={`mt-4 ${className}`} {...props}>
      {children}
    </div>
  );
}