"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function DashboardTopNav() {
  const searchParams = useSearchParams();
  const embed =
    searchParams.get("embed") === "1" || searchParams.get("embed") === "true";

  if (embed) return null;

  return (
    <nav className="w-full bg-gray-100 border-b border-gray-200 px-4 py-2 flex gap-4">
      <Link href="/dashboard" className="font-bold">
        Dashboard
      </Link>
      <Link href="/dashboard/uss">USS Hub</Link>
      <Link href="/dashboard/recursos">Recursos</Link>
      <Link href="/dashboard/consultorias">Consultorias</Link>
      <Link href="/dashboard/suporte">Suporte</Link>
      <Link href="/dashboard/conta">Conta</Link>
      <Link href="/dashboard/onboarding">Onboarding</Link>
      <Link href="/dashboard/notificacoes">Notificações</Link>
    </nav>
  );
}
