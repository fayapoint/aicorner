import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="w-full bg-gray-100 border-b border-gray-200 px-4 py-2 flex gap-4">
        <a href="/dashboard" className="font-bold">Dashboard</a>
        <a href="/dashboard/recursos">Recursos</a>
        <a href="/dashboard/consultorias">Consultorias</a>
        <a href="/dashboard/suporte">Suporte</a>
        <a href="/dashboard/conta">Conta</a>
        <a href="/dashboard/onboarding">Onboarding</a>
        <a href="/dashboard/notificacoes">Notificações</a>
      </nav>
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
