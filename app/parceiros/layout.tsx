// Force dynamic rendering to prevent SSR/SSG useContext errors
export const dynamic = 'force-dynamic'

import { ReactNode } from 'react'

interface ParceirosLayoutProps {
  children: ReactNode
}

export default function ParceirosLayout({ children }: ParceirosLayoutProps) {
  return <>{children}</>
}
