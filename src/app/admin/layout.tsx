import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Panel | Bündnis OST',
  description: 'Verwaltungsoberfläche für die Bündnis OST Plattform',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
