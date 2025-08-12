// Force dynamic rendering to prevent SSR/SSG useContext errors
export const dynamic = 'force-dynamic'

import { ReactNode } from 'react'

interface CarreirasLayoutProps {
  children: ReactNode
}

export default function CarreirasLayout({ children }: CarreirasLayoutProps) {
  return <>{children}</>
}
