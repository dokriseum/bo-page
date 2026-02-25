import Link from 'next/link'
import { ArrowRight, Calendar, MapPin, Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import EventCard from '@/components/events/EventCard'
import StoryCard from '@/components/stories/StoryCard'
import type { Event, Story } from '@/lib/types'

export const revalidate = 300 // Revalidate every 5 minutes

async function getUpcomingEvents(): Promise<Event[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('events')
    .select('*')
    .gte('start_date', new Date().toISOString())
    .order('start_date', { ascending: true })
    .limit(4)
  return data ?? []
}

async function getRecentStories(): Promise<Story[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('stories')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(4)
  return data ?? []
}

export default async function HomePage() {
  const [events, stories] = await Promise.all([getUpcomingEvents(), getRecentStories()])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Banner */}
      <section className="hero-card mb-10">
        <p className="section-label mb-2">OSTSICHT SCHÄRFEN, NETZWERKE STÄRKEN.</p>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
              Willkommen zur EventPlattform
            </h1>
            <p className="text-sm md:text-base" style={{ color: '#a5b4fc' }}>
              Entdecke spannende Events in deiner Nähe oder erstelle dein eigenes Event
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border text-white hover:bg-white/10 transition-all"
              style={{ borderColor: 'rgba(165,180,252,0.5)' }}
            >
              <MapPin size={14} />
              Events entdecken
            </Link>
            <Link
              href="/events/create"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border text-white hover:bg-white/10 transition-all"
              style={{ borderColor: 'rgba(165,180,252,0.5)' }}
            >
              <Plus size={14} />
              Event erstellen
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="section-label">BALD ANSTEHEND</p>
            <h2 className="text-2xl font-bold text-white">Die nächsten Events</h2>
            <p className="text-sm mt-0.5" style={{ color: '#8892a4' }}>
              {events.length > 0
                ? `${events.length} verifizierte Veranstaltung${events.length !== 1 ? 'en' : ''}, die in den kommenden Tagen starten.`
                : 'Noch keine Events eingetragen.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Sort toggle */}
            <div
              className="hidden md:flex items-center rounded-full p-0.5"
              style={{ background: '#1a2235', border: '1px solid #2d3748' }}
            >
              <button className="sort-btn active">Datum</button>
              <button className="sort-btn">Entfernung</button>
            </div>
            <Link
              href="/events"
              className="flex items-center gap-1.5 text-sm font-semibold hover:text-blue-300 transition-colors"
              style={{ color: '#60a5fa' }}
            >
              Alle Events ansehen
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {events.map((event, i) => (
              <EventCard key={event.id} event={event} animationIndex={i} />
            ))}
          </div>
        ) : (
          <div
            className="rounded-xl p-10 text-center"
            style={{ background: '#161b27', border: '1px solid #2d3748' }}
          >
            <Calendar size={32} className="mx-auto mb-3 text-gray-600" />
            <p className="text-sm" style={{ color: '#8892a4' }}>
              Noch keine bevorstehenden Events.{' '}
              <Link href="/events/create" style={{ color: '#60a5fa' }} className="hover:underline">
                Erstelle das erste!
              </Link>
            </p>
          </div>
        )}
      </section>

      {/* Stories Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="section-label">STORY-UPDATE</p>
            <h2 className="text-2xl font-bold text-white">Frisch eingetroffen</h2>
            <p className="text-sm mt-0.5" style={{ color: '#8892a4' }}>
              Neue Geschichten aus der Community – frisch veröffentlicht.
            </p>
          </div>
          <Link
            href="/geschichten"
            className="flex items-center gap-1.5 text-sm font-semibold hover:text-blue-300 transition-colors"
            style={{ color: '#60a5fa' }}
          >
            Alle Geschichten ansehen
            <ArrowRight size={14} />
          </Link>
        </div>

        {stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stories.map((story, i) => (
              <StoryCard key={story.id} story={story} animationIndex={i} />
            ))}
          </div>
        ) : (
          <div
            className="rounded-xl p-10 text-center"
            style={{ background: '#161b27', border: '1px solid #2d3748' }}
          >
            <p className="text-sm" style={{ color: '#8892a4' }}>
              Noch keine Geschichten vorhanden.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
