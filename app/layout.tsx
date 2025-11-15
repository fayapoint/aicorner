import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "AInSeconds - AI Solutions in Seconds",
  description: "From AI beginners to experts - get AI solutions implemented in seconds. Your comprehensive, safe, and supportive AI ecosystem. Start your AI journey today.",
  icons: {
    icon: '/favicon.svg',
  },
};

import dynamic from "next/dynamic";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";

const Header = dynamic(() => import("@/components/header").then(mod => ({ default: mod.Header })), {
  ssr: false,
  loading: () => (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-lg h-20" />
  ),
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen flex flex-col overflow-x-hidden">
        <Providers>
          <Header />
          {/* Main Content */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
