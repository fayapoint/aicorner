"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <Button
      variant="secondary"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="border"
      title="Sair da sessão"
    >
      Sair
    </Button>
  );
}
