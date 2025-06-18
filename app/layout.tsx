import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Portal Tech",
  description: "Transformação Digital Sem Limites",
};

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen flex flex-col overflow-x-hidden">
        <Header />
        {/* Main Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
