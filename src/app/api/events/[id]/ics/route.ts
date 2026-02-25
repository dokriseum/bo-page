import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { Event } from '@/lib/types'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single<Event>()

  if (!event) {
    return new NextResponse('Event not found', { status: 404 })
  }

  const dtStart = new Date(event.start_date)
    .toISOString()
    .replace(/[-:]/g, '')
    .replace('.000', '')
  const dtEnd = event.end_date
    ? new Date(event.end_date).toISOString().replace(/[-:]/g, '').replace('.000', '')
    : dtStart
  const now = new Date().toISOString().replace(/[-:]/g, '').replace('.000', '')

  const location = [event.location_name, event.location_address].filter(Boolean).join(', ')
  const desc = (event.description ?? '').replace(/\n/g, '\\n').slice(0, 500)

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Bündnis OST//EventPlattform//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}@buendnisost.de`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${event.title}`,
    location ? `LOCATION:${location}` : '',
    desc ? `DESCRIPTION:${desc}` : '',
    `URL:${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buendnisost.de'}/events/${event.id}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n')

  const slug = event.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .slice(0, 40)

  return new NextResponse(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${slug}.ics"`,
    },
  })
}
