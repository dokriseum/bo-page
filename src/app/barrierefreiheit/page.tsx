export const metadata = {
  title: 'Barrierefreiheit | Bündnis OST',
}

export default function BarrierefreiheitPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div
        className="rounded-xl p-6"
        style={{ background: '#161b27', border: '1px solid #2d3748' }}
      >
        <p className="section-label mb-1">RECHTLICHES</p>
        <h1 className="text-2xl font-bold text-white mb-6">Barrierefreiheit</h1>

        <div className="space-y-6 text-sm leading-relaxed" style={{ color: '#8892a4' }}>
          <div>
            <h2 className="text-base font-semibold text-white mb-2">Erklärung zur Barrierefreiheit</h2>
            <p>
              Bündnis OST ist bemüht, seine Website im Einklang mit den nationalen Rechtsvorschriften zur
              Umsetzung der Richtlinie (EU) 2016/2102 des Europäischen Parlaments und des Rates barrierefrei
              zugänglich zu machen.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">Umsetzungsstand</h2>
            <p>
              Diese Website strebt die Konformität mit dem Standard WCAG 2.1 Level AA an. Folgende Maßnahmen
              wurden umgesetzt:
            </p>
            <ul className="mt-2 space-y-1 ml-4 list-disc">
              <li>Semantische HTML-Strukturen</li>
              <li>Alt-Texte für Bilder</li>
              <li>Ausreichende Farbkontraste</li>
              <li>Tastaturnavigation</li>
              <li>ARIA-Labels für interaktive Elemente</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">Bekannte Einschränkungen</h2>
            <p>
              Die interaktive Karte (Leaflet) ist nicht vollständig per Tastatur navigierbar. Wir arbeiten
              an einer Verbesserung.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">Feedback und Kontakt</h2>
            <p>
              Wenn Sie Mängel in Bezug auf die barrierefreie Gestaltung feststellen, wenden Sie sich bitte
              an:{' '}
              <a href="mailto:events@buendnisost.de" style={{ color: '#60a5fa' }} className="hover:underline">
                events@buendnisost.de
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">Durchsetzungsverfahren</h2>
            <p>
              Bei nicht zufriedenstellenden Antworten auf Eingaben können Sie sich an die zuständige
              Durchsetzungsstelle wenden.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
