import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, User, Globe, ArrowLeft, Download } from 'lucide-react'
import ShareButton from '@/components/events/ShareButton'
import { createClient } from '@/lib/supabase/server'
import type { Event } from '@/lib/types'
import { formatEventDateTime, formatEventDate } from '@/lib/utils'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: event } = await supabase.from('events').select('title, description').eq('id', id).single()
  if (!event) return { title: 'Event nicht gefunden' }
  return {
    title: `${event.title} | Bündnis OST`,
    description: event.description ?? undefined,
  }
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single<Event>()

  if (!event) notFound()

  const isMachbar = event.type === 'machbar'
  const accentColor = isMachbar ? '#f97316' : '#3b82f6'

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back button */}
      <Link
        href="/events"
        className="inline-flex items-center gap-1.5 text-sm mb-6 hover:text-blue-300 transition-colors"
        style={{ color: '#8892a4' }}
      >
        <ArrowLeft size={14} />
        Zurück zu allen Events
      </Link>

      {/* Hero image */}
      <div
        className="relative w-full rounded-xl overflow-hidden mb-6"
        style={{ height: '320px' }}
      >
        {event.image_url ? (
          <>
            {/* Blurred background */}
            <Image
              src={event.image_url}
              alt=""
              fill
              className="object-cover"
              style={{ filter: 'blur(16px)', transform: 'scale(1.15)' }}
            />
            {/* Sharp center image */}
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              className="object-contain"
              sizes="800px"
            />
          </>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: isMachbar
                ? 'linear-gradient(135deg, #92400e, #c2410c)'
                : 'linear-gradient(135deg, #1e3a5f, #1d4ed8)',
            }}
          >
            <Calendar size={60} className="text-white/30" />
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className="rounded-xl p-6"
        style={{ background: '#161b27', border: '1px solid #2d3748' }}
      >
        {/* Type badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className={isMachbar ? 'badge-machbar' : 'badge-standard'}>
            {isMachbar ? 'MachBar-Event' : 'Standard-Event'}
          </span>
          {event.helpers_needed && (
            <span className="badge-helper">👥 Macher:innen gesucht</span>
          )}
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
          {event.title}
        </h1>

        {/* Share bar */}
        <div
          className="flex items-center gap-3 flex-wrap mb-6 pb-6"
          style={{ borderBottom: '1px solid #2d3748' }}
        >
          <p className="text-sm font-semibold" style={{ color: accentColor }}>
            Veranstaltung mit anderen teilen
          </p>
          <ShareButton />
          <a
            href={`/api/events/${event.id}/ics`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:bg-white/5"
            style={{ color: '#8892a4', borderColor: '#2d3748' }}
          >
            <Download size={12} />
            Kalender
          </a>
        </div>

        {/* Meta info */}
        <div className="space-y-4 mb-6">
          {/* Date */}
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(243,156,18,0.15)' }}
            >
              <Calendar size={18} style={{ color: '#f39c12' }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {formatEventDate(event.start_date)}
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#8892a4' }}>
                {formatEventDateTime(event.start_date)}
                {event.end_date && ` – ${formatEventDateTime(event.end_date)}`}
              </p>
            </div>
          </div>

          {/* Location */}
          {event.location_name && (
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(39,174,96,0.15)' }}
              >
                <MapPin size={18} style={{ color: '#27ae60' }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{event.location_name}</p>
                {event.location_address && (
                  <p className="text-xs mt-0.5" style={{ color: '#8892a4' }}>
                    {event.location_address}
                  </p>
                )}
                {event.location_lat && event.location_lng && (
                  <a
                    href={`https://maps.google.com/?q=${event.location_lat},${event.location_lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs mt-1 inline-block"
                    style={{ color: '#60a5fa' }}
                  >
                    In Google Maps öffnen →
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Organizer */}
          {event.organizer_name && (
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(155,89,182,0.15)' }}
              >
                <User size={18} style={{ color: '#9b59b6' }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{event.organizer_name}</p>
                <p className="text-xs mt-0.5" style={{ color: '#8892a4' }}>Organizer</p>
              </div>
            </div>
          )}

          {/* Website */}
          {event.website_url && (
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(52,152,219,0.15)' }}
              >
                <Globe size={18} style={{ color: '#3498db' }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Webseite</p>
                <a
                  href={event.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs mt-0.5 hover:underline"
                  style={{ color: '#60a5fa' }}
                >
                  {event.website_url}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Helpers needed */}
        {event.helpers_needed && event.helpers_description && (
          <div
            className="rounded-xl p-4 mb-6"
            style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)' }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: '#fb923c' }}>
              👥 Helfer:innen gesucht
            </p>
            <p className="text-sm" style={{ color: '#fed7aa' }}>
              {event.helpers_description}
            </p>
          </div>
        )}

        {/* MachBar CTA */}
        {event.helpers_needed && (
          <a
            href={`mailto:${event.contact_info ?? 'info@buendnisost.de'}?subject=Helfen bei: ${event.title}`}
            className="block w-full text-center py-3 rounded-xl text-sm font-bold text-white mb-6 transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}
          >
            💚 Jetzt helfen und Möglichmachen
          </a>
        )}

        {/* Description */}
        <div>
          <h2 className="text-base font-semibold text-white mb-3">Beschreibung</h2>
          <div
            className="text-sm leading-relaxed whitespace-pre-line"
            style={{ color: '#8892a4' }}
          >
            {event.description ?? 'Keine Beschreibung vorhanden.'}
          </div>
        </div>
      </div>
    </div>
  )
}
