// Force dynamic rendering to prevent SSR/SSG useContext errors
export const dynamic = 'force-dynamic'

import { ReactNode } from 'react'

interface CasesLayoutProps {
  children: ReactNode
}

export default function CasesLayout({ children }: CasesLayoutProps) {
  return <>{children}</>
}
