'use client'

import { usePathname } from 'next/navigation'
import RainbowBar from './RainbowBar'
import Navigation from './Navigation'
import Footer from './Footer'

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <RainbowBar />
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
      {/* Floating Action Button */}
      <a
        href="/events/create"
        className="floating-btn"
        aria-label="Event erstellen"
        title="Neues Event erstellen"
      >
        +
      </a>
    </>
  )
}
