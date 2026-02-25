export const metadata = {
  title: 'Über uns | Bündnis OST',
}

export default function UeberUnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div
        className="rounded-xl p-6 mb-8"
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #1e3a5f 100%)',
          border: '1px solid rgba(99,102,241,0.3)',
        }}
      >
        <p className="section-label">ÜBER UNS</p>
        <h1 className="text-3xl font-bold text-white">Das Bündnis OST</h1>
      </div>

      <div className="space-y-6">
        <Section title="Was ist Bündnis OST?">
          <p>
            Bündnis OST ist eine überparteiliche Plattform, die Initiativen, Vereine und engagierte Menschen
            aus den ostdeutschen Bundesländern vernetzt. Wir fördern den Austausch, die Sichtbarkeit und die
            Stärke der demokratischen Zivilgesellschaft im Osten Deutschlands.
          </p>
        </Section>

        <Section title="Unsere Mission">
          <p>
            <strong className="text-white">Ostsicht schärfen, Netzwerke stärken.</strong>
          </p>
          <p className="mt-2">
            Wir glauben, dass die Geschichten, Erfahrungen und das Engagement von Menschen aus dem Osten
            Deutschlands sichtbarer werden müssen. Auf dieser Plattform findest du Events, kannst deine eigenen
            Veranstaltungen eintragen und dich mit anderen vernetzen.
          </p>
        </Section>

        <Section title="Was wir anbieten">
          <ul className="space-y-2">
            {[
              '📅 Event-Plattform für Veranstaltungen aus ganz Ostdeutschland',
              '📖 Geschichten – persönliche Erfahrungsberichte aus der Region',
              '🌐 Netzwerk – Organisationen und Initiativen entdecken',
              '🗺️ Interaktive Karte für Events in deiner Nähe',
              '🔔 Kalender-Abonnement für aktuelle Veranstaltungen',
            ].map((item) => (
              <li key={item} className="text-sm flex items-start gap-2" style={{ color: '#c4cad6' }}>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Kontakt">
          <p>
            Du möchtest deine Organisation eintragen, eine Geschichte teilen oder uns Feedback geben?
            Schreib uns unter{' '}
            <a
              href="mailto:events@buendnisost.de"
              className="hover:underline"
              style={{ color: '#60a5fa' }}
            >
              events@buendnisost.de
            </a>
          </p>
        </Section>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: '#161b27', border: '1px solid #2d3748' }}
    >
      <h2 className="text-lg font-semibold text-white mb-3">{title}</h2>
      <div className="text-sm leading-relaxed" style={{ color: '#8892a4' }}>
        {children}
      </div>
    </div>
  )
}
