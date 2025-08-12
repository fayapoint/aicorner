// Force dynamic rendering to prevent SSR/SSG useContext errors
export const dynamic = 'force-dynamic'

import { ReactNode } from 'react'

interface ServicosLayoutProps {
  children: ReactNode
}

export default function ServicosLayout({ children }: ServicosLayoutProps) {
  return <>{children}</>
}
