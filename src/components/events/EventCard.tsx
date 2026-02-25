import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin } from 'lucide-react'
import type { Event } from '@/lib/types'
import {
  getEventDay,
  getEventMonth,
  formatEventDateTime,
  truncateText,
  isEventPast,
} from '@/lib/utils'

interface EventCardProps {
  event: Event
  className?: string
  animationIndex?: number
}

export default function EventCard({ event, className = '', animationIndex = 0 }: EventCardProps) {
  const past = isEventPast(event.start_date)
  const day = getEventDay(event.start_date)
  const month = getEventMonth(event.start_date)
  const isMachbar = event.type === 'machbar'

  return (
    <Link
      href={`/events/${event.id}`}
      className={`event-card animate-fade-in-up stagger-${Math.min(animationIndex + 1, 8)} ${
        past ? 'opacity-60' : ''
      } ${className}`}
      style={{ textDecoration: 'none' }}
    >
      {/* Image Area */}
      <div className="relative w-full overflow-hidden" style={{ height: '180px' }}>
        {event.image_url ? (
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: isMachbar
                ? 'linear-gradient(135deg, #92400e, #c2410c)'
                : 'linear-gradient(135deg, #1e3a5f, #1d4ed8)',
            }}
          />
        )}

        {/* Date Badge */}
        <div className={`date-badge-circle ${isMachbar ? '' : 'standard'}`}>
          <span className="day">{day}</span>
          <span className="month">{month}</span>
        </div>

        {/* Past overlay */}
        {past && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-xs font-semibold text-white/70 bg-black/50 px-2 py-1 rounded">
              Vergangen
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        {/* Type Badge */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={isMachbar ? 'badge-machbar' : 'badge-standard'}>
            {isMachbar ? 'MachBar-Events' : 'Standard-Events'}
          </span>
          {event.helpers_needed && (
            <span className="badge-helper">
              👥 Macher:innen gesucht
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm leading-snug" style={{ color: '#e2e8f0' }}>
          {truncateText(event.title, 60)}
        </h3>

        {/* Description excerpt */}
        {event.description && (
          <p className="text-xs leading-relaxed line-clamp-3" style={{ color: '#8892a4' }}>
            {truncateText(event.description, 120)}
          </p>
        )}

        {/* Meta */}
        <div className="mt-auto flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs" style={{ color: '#8892a4' }}>
            <Calendar size={11} className="flex-shrink-0" />
            <span className="truncate">
              {formatEventDateTime(event.start_date)}
              {event.end_date && ' – bi...'}
            </span>
          </div>
          {event.location_name && (
            <div className="flex items-center gap-1.5 text-xs" style={{ color: '#8892a4' }}>
              <MapPin size={11} className="flex-shrink-0" />
              <span className="truncate">{event.location_name}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
