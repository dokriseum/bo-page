import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-16 pt-12 pb-8"
      style={{ background: '#0a0e17', borderTop: '1px solid #1e2535' }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Logo + About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-blue-400 to-green-400 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
                  <circle cx="24" cy="24" r="24" fill="url(#footerLogoGrad)" />
                  <text x="24" y="32" textAnchor="middle" fontSize="20" fontWeight="bold" fill="white">B</text>
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="48" y2="48">
                      <stop stopColor="#9b59b6" />
                      <stop offset="0.5" stopColor="#3498db" />
                      <stop offset="1" stopColor="#27ae60" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-white uppercase tracking-wide">BÜNDNIS OST</div>
                <div className="text-xs font-semibold" style={{ color: '#0ea5e9' }}>
                  Ostsicht schärfen,<br />Netzwerke stärken.
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Unsere Plattform verbindet Initiativen, Vereine und
              Engagierte mit passenden Events in ihrer Region.
              Erstelle eigene Aktionen oder finde Mitstreiter:innen
              in deiner Nähe.
            </p>
            <p className="text-xs" style={{ color: '#8892a4' }}>
              E-Mail:{' '}
              <a
                href="mailto:events@buendnisost.de"
                className="hover:text-blue-400 transition-colors"
                style={{ color: '#60a5fa' }}
              >
                events@buendnisost.de
              </a>
            </p>
            <div className="mt-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center px-4 py-2 text-xs font-medium rounded-lg border transition-all hover:bg-white/5"
                style={{
                  color: '#8892a4',
                  borderColor: '#2d3748',
                }}
              >
                Support kontaktieren
              </Link>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#4a5568' }}>
              Schnellzugriff
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Startseite' },
                { href: '/events', label: 'Events entdecken' },
                { href: '/events/create', label: 'Event erstellen' },
                { href: '/hilfe', label: 'Hilfe & Tipps' },
                { href: '/netzwerk', label: 'Netzwerk' },
                { href: '/ueber-uns', label: 'Über uns' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-colors hover:text-blue-400"
                    style={{ color: '#8892a4' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#4a5568' }}>
              Rechtliches
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/impressum', label: 'Impressum' },
                { href: '/datenschutz', label: 'Datenschutz' },
                { href: '/barrierefreiheit', label: 'Barrierefreiheit' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-colors hover:text-blue-400"
                    style={{ color: '#8892a4' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderTop: '1px solid #1e2535' }}
        >
          <p className="text-xs" style={{ color: '#4a5568' }}>
            © {year} Bündnis OST. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs" style={{ color: '#4a5568' }}>
            Made with{' '}
            <span style={{ color: '#e91e63' }}>♥</span>{' '}
            für lokale Bündnisse. by{' '}
            <span style={{ color: '#0ea5e9' }}>Bündnis Ost</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
