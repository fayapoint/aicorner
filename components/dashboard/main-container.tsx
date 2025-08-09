"use client";

import { PropsWithChildren } from "react";
import { useSearchParams } from "next/navigation";

export default function MainContainer({ children }: PropsWithChildren) {
  const sp = useSearchParams();
  const embed = sp.get("embed") === "1" || sp.get("embed") === "true";
  const className = embed
    ? "flex-1 w-full max-w-4xl mx-auto px-2 py-2"
    : "flex-1 w-full max-w-4xl mx-auto px-4 py-8";
  return <main className={className}>{children}</main>;
}
