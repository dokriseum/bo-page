import { Globe, Mail, MapPin, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Organization } from '@/lib/types'

export const metadata = {
  title: 'Netzwerk | Bündnis OST',
  description: 'Entdecke Organisationen, Initiativen und Vereine aus Ostdeutschland.',
}

export const revalidate = 3600

async function getOrganizations(): Promise<Organization[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('organizations')
    .select('*')
    .order('name', { ascending: true })
  return data ?? []
}

export default async function NetzwerkPage() {
  const orgs = await getOrganizations()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero */}
      <div
        className="rounded-xl p-6 mb-8"
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #065f46 40%, #1e3a5f 100%)',
          border: '1px solid rgba(16,185,129,0.3)',
        }}
      >
        <p className="section-label" style={{ color: '#6ee7b7' }}>NETZWERK</p>
        <h1 className="text-3xl font-bold text-white mb-2">
          Netzwerk für Bündnisse & Initiativen
        </h1>
        <p className="text-sm" style={{ color: '#a7f3d0' }}>
          Entdecke Organisationen, die ähnliche Ziele verfolgen, und finde Ansprechpartner:innen.
        </p>
      </div>

      {orgs.length === 0 ? (
        <div
          className="rounded-xl p-12 text-center"
          style={{ background: '#161b27', border: '1px solid #2d3748' }}
        >
          <Globe size={40} className="mx-auto mb-4" style={{ color: '#374151' }} />
          <h3 className="font-semibold text-white mb-2">Noch keine Organisationen eingetragen</h3>
          <p className="text-sm mb-4" style={{ color: '#8892a4' }}>
            Bald findest du hier Vereine, Initiativen und Netzwerke aus Ostdeutschland.
          </p>
          <a
            href="mailto:events@buendnisost.de?subject=Organisation eintragen"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: 'rgba(59,130,246,0.15)',
              color: '#60a5fa',
              border: '1px solid rgba(59,130,246,0.3)',
            }}
          >
            Organisation eintragen
            <ArrowRight size={14} />
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orgs.map((org) => (
            <div
              key={org.id}
              className="rounded-xl p-5 flex flex-col gap-3 transition-all hover:border-gray-600"
              style={{ background: '#161b27', border: '1px solid #2d3748' }}
            >
              <h3 className="font-semibold text-white">{org.name}</h3>
              {org.description && (
                <p className="text-xs leading-relaxed" style={{ color: '#8892a4' }}>
                  {org.description.slice(0, 140)}
                  {org.description.length > 140 && '…'}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mt-auto">
                {org.city && (
                  <span className="flex items-center gap-1 text-xs" style={{ color: '#8892a4' }}>
                    <MapPin size={10} />
                    {org.city}
                    {org.bundesland && `, ${org.bundesland}`}
                  </span>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                {org.website_url && (
                  <a
                    href={org.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg transition-all hover:bg-white/10"
                    style={{ color: '#60a5fa', border: '1px solid rgba(59,130,246,0.3)' }}
                  >
                    <Globe size={10} />
                    Webseite
                  </a>
                )}
                {org.contact_email && (
                  <a
                    href={`mailto:${org.contact_email}`}
                    className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg transition-all hover:bg-white/10"
                    style={{ color: '#8892a4', border: '1px solid #2d3748' }}
                  >
                    <Mail size={10} />
                    Kontakt
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
