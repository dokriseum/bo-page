export const metadata = {
  title: 'Datenschutz | Bündnis OST',
}

export default function DatenschutzPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div
        className="rounded-xl p-6"
        style={{ background: '#161b27', border: '1px solid #2d3748' }}
      >
        <p className="section-label mb-1">RECHTLICHES</p>
        <h1 className="text-2xl font-bold text-white mb-6">Datenschutzerklärung</h1>

        <div className="space-y-6 text-sm leading-relaxed" style={{ color: '#8892a4' }}>
          <div>
            <h2 className="text-base font-semibold text-white mb-2">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-sm font-medium text-gray-300 mb-1">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
              Daten passiert, wenn Sie diese Website besuchen.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">2. Verantwortliche Stelle</h2>
            <p>
              Verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br />
              Bündnis OST<br />
              E-Mail: events@buendnisost.de
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">3. Datenerfassung auf dieser Website</h2>
            <h3 className="text-sm font-medium text-gray-300 mb-1">Cookies</h3>
            <p>
              Unsere Website verwendet ausschließlich technisch notwendige Cookies für die Authentifizierung.
              Wir verwenden keine Tracking- oder Analyse-Cookies von Drittanbietern.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">4. Anmeldung (Authentifizierung)</h2>
            <p>
              Zur Anmeldung verwenden wir Magic Links per E-Mail. Wir speichern nur Ihre E-Mail-Adresse.
              Keine Passwörter werden gespeichert. Ihr Account kann jederzeit auf Anfrage gelöscht werden.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">5. Hosting (Supabase)</h2>
            <p>
              Diese Website nutzt Supabase als Backend-Dienst. Supabase speichert Daten auf EU-Servern.
              Weitere Informationen:{' '}
              <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa' }} className="hover:underline">
                supabase.com/privacy
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">6. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der
              Verarbeitung Ihrer gespeicherten Daten. Anfragen richten Sie bitte an: events@buendnisost.de
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
