import type { Metadata } from 'next'
import './globals.css'
import RainbowBar from '@/components/layout/RainbowBar'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Bündnis OST | OSTSICHT schärfen – Netzwerke stärken.',
  description:
    'Entdecke Events, Geschichten und Netzwerke aus Ostdeutschland. Eine Plattform für Initiativen, Vereine und Engagierte.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buendnisost.de'),
  openGraph: {
    title: 'Bündnis OST – Event-Plattform',
    description:
      'Finde und erstelle Events, entdecke Geschichten und vernetze dich mit gleichgesinnten Initiativen im Osten Deutschlands.',
    siteName: 'Bündnis OST',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bündnis OST – Event-Plattform',
    description: 'Events, Geschichten und Netzwerke aus Ostdeutschland.',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body className="antialiased" style={{ background: '#0d1117', color: '#e2e8f0' }}>
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
      </body>
    </html>
  )
}
