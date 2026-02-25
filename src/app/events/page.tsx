'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { Calendar, Map, LayoutList, ChevronDown, CalendarCheck } from 'lucide-react'
import dynamic from 'next/dynamic'
import { createClient } from '@/lib/supabase/client'
import EventCard from '@/components/events/EventCard'
import EventFilters from '@/components/events/EventFilters'
import type { Event, EventFilter, SortMode, EventFiltersState } from '@/lib/types'
import { isEventPast, calculateDistance } from '@/lib/utils'

const EventMap = dynamic(() => import('@/components/events/EventMap'), {
  ssr: false,
  loading: () => (
    <div
      className="rounded-xl flex items-center justify-center"
      style={{ height: '500px', background: '#161b27', border: '1px solid #2d3748' }}
    >
      <p style={{ color: '#8892a4' }}>Karte wird geladen…</p>
    </div>
  ),
})

const ITEMS_PER_PAGE = 12

const defaultFilters: EventFiltersState = {
  keyword: '',
  location: '',
  distance: null,
  bundesland: '',
  kreis: '',
  showPast: false,
  useCurrentLocation: false,
  lat: null,
  lng: null,
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState<EventFilter>('all')
  const [sortMode, setSortMode] = useState<SortMode>('date')
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [filters, setFilters] = useState<EventFiltersState>(defaultFilters)
  const [page, setPage] = useState(1)

  const supabase = createClient()

  useEffect(() => {
    async function loadEvents() {
      setLoading(true)
      const { data } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: true })
      setEvents(data ?? [])
      setLoading(false)
    }
    loadEvents()
  }, [])

  // Apply filters
  const filteredEvents = useMemo(() => {
    let result = [...events]

    // Type filter
    if (typeFilter !== 'all') {
      result = result.filter((e) => e.type === typeFilter)
    }

    // Past events filter
    if (!filters.showPast) {
      result = result.filter((e) => !isEventPast(e.start_date))
    }

    // Keyword
    if (filters.keyword.trim()) {
      const kw = filters.keyword.toLowerCase()
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(kw) ||
          (e.description && e.description.toLowerCase().includes(kw)) ||
          (e.location_name && e.location_name.toLowerCase().includes(kw)) ||
          (e.bundesland && e.bundesland.toLowerCase().includes(kw))
      )
    }

    // Bundesland
    if (filters.bundesland) {
      result = result.filter((e) => e.bundesland === filters.bundesland)
    }

    // Kreis
    if (filters.kreis.trim()) {
      const k = filters.kreis.toLowerCase()
      result = result.filter((e) => e.kreis?.toLowerCase().includes(k))
    }

    // Distance
    if (filters.distance !== null && filters.lat !== null && filters.lng !== null) {
      result = result.filter((e) => {
        if (!e.location_lat || !e.location_lng) return false
        const dist = calculateDistance(
          filters.lat!,
          filters.lng!,
          e.location_lat,
          e.location_lng
        )
        return dist <= filters.distance!
      })
    }

    // Sort
    if (sortMode === 'date') {
      result.sort(
        (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
      )
    } else if (sortMode === 'distance' && filters.lat !== null && filters.lng !== null) {
      result.sort((a, b) => {
        const distA =
          a.location_lat && a.location_lng
            ? calculateDistance(filters.lat!, filters.lng!, a.location_lat, a.location_lng)
            : 99999
        const distB =
          b.location_lat && b.location_lng
            ? calculateDistance(filters.lat!, filters.lng!, b.location_lat, b.location_lng)
            : 99999
        return distA - distB
      })
    }

    return result
  }, [events, typeFilter, sortMode, filters])

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE)
  const paginatedEvents = filteredEvents.slice(0, page * ITEMS_PER_PAGE)
  const hasMore = page < totalPages

  const handleFiltersChange = useCallback((newFilters: EventFiltersState) => {
    setFilters(newFilters)
    setPage(1)
  }, [])

  const handleTypeFilter = (type: EventFilter) => {
    setTypeFilter(type)
    setPage(1)
  }

  // Subscribe to calendar (ICS)
  function subscribeCalendar() {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/calendar.ics`
    window.open(url, '_blank')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Hero Header */}
      <div
        className="rounded-xl p-6 mb-6"
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #1e3a5f 100%)',
          border: '1px solid rgba(99,102,241,0.3)',
        }}
      >
        <p className="section-label">KALENDER & KARTE</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Alle Events</h1>
            <p className="text-sm mt-1" style={{ color: '#a5b4fc' }}>
              Finde Veranstaltungen nach Stichwort, Region oder Umkreis – wähle Liste oder Karte.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={subscribeCalendar}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border text-white hover:bg-white/10 transition-all"
              style={{ borderColor: 'rgba(165,180,252,0.4)' }}
            >
              <CalendarCheck size={14} />
              Kalender abonnieren
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                viewMode === 'list'
                  ? 'bg-white/20 text-white border-white/30'
                  : 'text-white/60 border-white/20 hover:bg-white/10'
              }`}
            >
              <LayoutList size={14} />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                viewMode === 'map'
                  ? 'bg-white/20 text-white border-white/30'
                  : 'text-white/60 border-white/20 hover:bg-white/10'
              }`}
            >
              <Map size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Type Filter Tabs + Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        {/* Type tabs */}
        <div className="flex items-center gap-1.5">
          {(['all', 'standard', 'machbar'] as EventFilter[]).map((type) => (
            <button
              key={type}
              onClick={() => handleTypeFilter(type)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                background:
                  typeFilter === type
                    ? type === 'machbar'
                      ? 'rgba(249,115,22,0.2)'
                      : type === 'standard'
                      ? 'rgba(59,130,246,0.2)'
                      : 'rgba(255,255,255,0.1)'
                    : 'transparent',
                color:
                  typeFilter === type
                    ? type === 'machbar'
                      ? '#fb923c'
                      : type === 'standard'
                      ? '#60a5fa'
                      : '#e2e8f0'
                    : '#8892a4',
                border: `1px solid ${
                  typeFilter === type
                    ? type === 'machbar'
                      ? 'rgba(249,115,22,0.4)'
                      : type === 'standard'
                      ? 'rgba(59,130,246,0.4)'
                      : 'rgba(255,255,255,0.2)'
                    : 'transparent'
                }`,
              }}
            >
              {type === 'all' ? 'Alle' : type === 'standard' ? 'Standard' : 'MachBar'}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#4a5568' }}>
            Sortierung
          </span>
          <div
            className="flex items-center rounded-full p-0.5"
            style={{ background: '#1a2235', border: '1px solid #2d3748' }}
          >
            <button
              onClick={() => setSortMode('date')}
              className={`sort-btn ${sortMode === 'date' ? 'active' : ''}`}
            >
              Datum
            </button>
            <button
              onClick={() => setSortMode('distance')}
              className={`sort-btn ${sortMode === 'distance' ? 'active' : ''}`}
            >
              Entfernung
            </button>
          </div>
          {sortMode === 'distance' && filters.lat === null && (
            <p className="text-xs" style={{ color: '#f97316' }}>
              Standort wählen oder freigeben, um nach Entfernung zu sortieren.
            </p>
          )}
        </div>
      </div>

      {/* Filters */}
      <EventFilters
        filters={filters}
        onChange={handleFiltersChange}
        totalCount={filteredEvents.length}
      />

      {/* Content */}
      {viewMode === 'map' ? (
        <EventMap events={filteredEvents} />
      ) : (
        <>
          {/* Group by type if "all" filter */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl animate-pulse"
                  style={{ height: '320px', background: '#161b27' }}
                />
              ))}
            </div>
          ) : filteredEvents.length === 0 ? (
            <div
              className="rounded-xl p-12 text-center"
              style={{ background: '#161b27', border: '1px solid #2d3748' }}
            >
              <Calendar size={40} className="mx-auto mb-4 text-gray-600" />
              <h3 className="font-semibold text-white mb-2">Keine Events gefunden</h3>
              <p className="text-sm mb-4" style={{ color: '#8892a4' }}>
                Mit den aktuellen Filtern wurden keine Veranstaltungen gefunden.
              </p>
              <Link href="/events/create" className="btn-create">
                Erstes Event erstellen
              </Link>
            </div>
          ) : (
            <>
              {/* Section heading */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold text-white">
                  {typeFilter === 'all'
                    ? '⭐ Alle Events'
                    : typeFilter === 'machbar'
                    ? '💛 MachBar-Events'
                    : '⭐ Standard-Events'}
                </span>
                <span className="text-sm" style={{ color: '#8892a4' }}>
                  ({filteredEvents.length})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {paginatedEvents.map((event, i) => (
                  <EventCard key={event.id} event={event} animationIndex={i} />
                ))}
              </div>

              {/* Pagination */}
              {hasMore && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all"
                    style={{
                      background: 'rgba(59,130,246,0.15)',
                      color: '#60a5fa',
                      border: '1px solid rgba(59,130,246,0.3)',
                    }}
                  >
                    Mehr laden
                    <ChevronDown size={14} />
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
