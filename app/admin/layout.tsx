// Force dynamic rendering to prevent SSR/SSG useContext errors
export const dynamic = 'force-dynamic'

import { ReactNode } from 'react'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <>{children}</>
}
