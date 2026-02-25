'use client'

import { useState, useCallback } from 'react'
import { Search, MapPin, X, ChevronDown, ChevronUp, Filter } from 'lucide-react'
import type { EventFiltersState } from '@/lib/types'
import { BUNDESLAENDER, DISTANCE_OPTIONS } from '@/lib/types'

interface EventFiltersProps {
  filters: EventFiltersState
  onChange: (filters: EventFiltersState) => void
  totalCount?: number
}

export default function EventFilters({ filters, onChange, totalCount }: EventFiltersProps) {
  const [expanded, setExpanded] = useState(false)

  const update = useCallback(
    (partial: Partial<EventFiltersState>) => {
      onChange({ ...filters, ...partial })
    },
    [filters, onChange]
  )

  const activeFilterCount = [
    filters.keyword,
    filters.location || (filters.lat !== null),
    filters.bundesland,
    filters.kreis,
    filters.showPast,
  ].filter(Boolean).length

  function resetAll() {
    onChange({
      keyword: '',
      location: '',
      distance: null,
      bundesland: '',
      kreis: '',
      showPast: false,
      useCurrentLocation: false,
      lat: null,
      lng: null,
    })
  }

  function useCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          update({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            location: 'Aktueller Standort',
            useCurrentLocation: true,
            distance: filters.distance ?? 25,
          })
        },
        () => alert('Standort konnte nicht ermittelt werden.')
      )
    }
  }

  return (
    <div className="filter-panel mb-4">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-white">Finde Events nach deinen Kriterien</h2>
          <p className="text-xs mt-0.5" style={{ color: '#8892a4' }}>
            Verfeinere die Liste mit Stichwort, Bundesland, Kreis oder Umkreis.
          </p>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{
            background: expanded ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.05)',
            color: expanded ? '#60a5fa' : '#8892a4',
            border: `1px solid ${expanded ? 'rgba(59,130,246,0.3)' : '#2d3748'}`,
          }}
        >
          <Filter size={12} />
          {expanded ? 'Schließen' : 'Filter öffnen'}
          {activeFilterCount > 0 && (
            <span className="ml-1 w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="text-xs font-semibold" style={{ color: '#4a5568' }}>
            AKTIVE FILTER:
          </span>
          {filters.keyword && (
            <FilterChip label={`"${filters.keyword}"`} onRemove={() => update({ keyword: '' })} />
          )}
          {(filters.location || filters.lat !== null) && (
            <FilterChip
              label={filters.location || 'Standort'}
              onRemove={() => update({ location: '', lat: null, lng: null, useCurrentLocation: false })}
            />
          )}
          {filters.distance && (
            <FilterChip label={`${filters.distance} km`} onRemove={() => update({ distance: null })} />
          )}
          {filters.bundesland && (
            <FilterChip label={filters.bundesland} onRemove={() => update({ bundesland: '', kreis: '' })} />
          )}
          {filters.kreis && (
            <FilterChip label={filters.kreis} onRemove={() => update({ kreis: '' })} />
          )}
          {filters.showPast && (
            <FilterChip label="Vergangene Events" onRemove={() => update({ showPast: false })} />
          )}
          <button
            onClick={resetAll}
            className="text-xs text-red-400 hover:text-red-300 underline ml-1"
          >
            Alle zurücksetzen
          </button>
        </div>
      )}

      {/* Expanded filter area */}
      {expanded && (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Keyword search */}
          <div>
            <label className="form-label flex items-center gap-1.5">
              <Search size={12} />
              Stichwortsuche
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Titel, Stadt, Kategorie …"
                value={filters.keyword}
                onChange={(e) => update({ keyword: e.target.value })}
                className="form-input pr-8"
              />
              {filters.keyword && (
                <button
                  onClick={() => update({ keyword: '' })}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Location / Radius search */}
          <div>
            <label className="form-label flex items-center gap-1.5">
              <MapPin size={12} />
              Umkreissuche
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Ort oder Adresse eingeben"
                  value={filters.location}
                  onChange={(e) => update({ location: e.target.value, lat: null, lng: null })}
                  className="form-input pr-8"
                />
                {filters.location && (
                  <button
                    onClick={() => update({ location: '', lat: null, lng: null })}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <button
                onClick={useCurrentLocation}
                className="px-3 py-2 rounded-lg text-xs font-medium text-blue-400 border border-blue-800/50 hover:bg-blue-900/20 transition-all flex-shrink-0"
              >
                GPS
              </button>
            </div>
          </div>

          {/* Distance buttons */}
          <div>
            <label className="form-label">Aktuellen Standort verwenden</label>
            <p className="text-xs mb-2" style={{ color: '#4a5568' }}>
              Wähle einen Ort und dann den gesuchten Radius
            </p>
            <div className="flex gap-1.5 flex-wrap">
              {DISTANCE_OPTIONS.map((km) => (
                <button
                  key={km}
                  onClick={() => update({ distance: filters.distance === km ? null : km })}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background:
                      filters.distance === km
                        ? 'rgba(59,130,246,0.2)'
                        : 'rgba(255,255,255,0.05)',
                    color: filters.distance === km ? '#60a5fa' : '#8892a4',
                    border: `1px solid ${
                      filters.distance === km ? 'rgba(59,130,246,0.4)' : '#2d3748'
                    }`,
                  }}
                >
                  {km} km
                </button>
              ))}
            </div>
          </div>

          {/* Bundesland & Kreis */}
          <div>
            <label className="form-label">Bundesland & Kreis / Bezirk</label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={filters.bundesland}
                onChange={(e) => update({ bundesland: e.target.value, kreis: '' })}
                className="form-input"
              >
                <option value="">Alle Bundesländer</option>
                {BUNDESLAENDER.map((bl) => (
                  <option key={bl.id} value={bl.name}>
                    {bl.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Alle Kreise oder Bezirke"
                value={filters.kreis}
                onChange={(e) => update({ kreis: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          {/* Show past events */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => update({ showPast: !filters.showPast })}
                className="relative w-8 h-4 rounded-full transition-colors"
                style={{ background: filters.showPast ? '#3b82f6' : '#374151' }}
              >
                <div
                  className="absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform shadow"
                  style={{ transform: filters.showPast ? 'translateX(17px)' : 'translateX(2px)' }}
                />
              </div>
              <span className="text-xs" style={{ color: '#8892a4' }}>
                Vergangene Events einblenden
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{
        background: 'rgba(59,130,246,0.15)',
        color: '#93c5fd',
        border: '1px solid rgba(59,130,246,0.3)',
      }}
    >
      {label}
      <button onClick={onRemove} className="hover:text-white transition-colors ml-0.5">
        <X size={10} />
      </button>
    </span>
  )
}
