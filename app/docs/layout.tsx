// Force dynamic rendering to prevent SSR/SSG useContext errors
export const dynamic = 'force-dynamic'

import { ReactNode } from 'react'

interface DocsLayoutProps {
  children: ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return <>{children}</>
}
