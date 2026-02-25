export const metadata = {
  title: 'Impressum | Bündnis OST',
}

export default function ImpressumPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div
        className="rounded-xl p-6 mb-6"
        style={{ background: '#161b27', border: '1px solid #2d3748' }}
      >
        <p className="section-label mb-1">RECHTLICHES</p>
        <h1 className="text-2xl font-bold text-white mb-6">Impressum</h1>

        <div className="space-y-6 text-sm leading-relaxed" style={{ color: '#8892a4' }}>
          <div>
            <h2 className="text-base font-semibold text-white mb-2">Angaben gemäß § 5 TMG</h2>
            <p>
              Bündnis OST<br />
              [Anschrift hier eintragen]<br />
              [PLZ Ort]
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">Kontakt</h2>
            <p>
              E-Mail:{' '}
              <a href="mailto:events@buendnisost.de" style={{ color: '#60a5fa' }} className="hover:underline">
                events@buendnisost.de
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>[Name Verantwortliche:r]<br />[Anschrift]</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">Haftungsausschluss</h2>
            <p>
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
              deutschen Urheberrecht. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden,
              werden die Urheberrechte Dritter beachtet.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
