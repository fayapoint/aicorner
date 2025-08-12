import type { ReactNode } from "react";
import { Suspense } from "react";
import DashboardTopNav from "@/components/dashboard/top-nav";
import MainContainer from "@/components/dashboard/main-container";

// Force dynamic rendering for all dashboard pages
export const dynamic = 'force-dynamic';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={null}>
        <DashboardTopNav />
      </Suspense>
      <Suspense fallback={null}>
        <MainContainer>{children}</MainContainer>
      </Suspense>
    </div>
  );
}
