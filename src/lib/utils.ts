import { format, formatDistanceToNow, isPast, isToday } from 'date-fns'
import { de } from 'date-fns/locale'

export function formatEventDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return format(date, 'dd.MM.yyyy', { locale: de })
  } catch {
    return dateString
  }
}

export function formatEventTime(dateString: string): string {
  try {
    const date = new Date(dateString)
    return format(date, 'HH:mm', { locale: de })
  } catch {
    return ''
  }
}

export function formatEventDateTime(dateString: string): string {
  try {
    const date = new Date(dateString)
    return format(date, "dd.MM.yyyy 'um' HH:mm 'Uhr'", { locale: de })
  } catch {
    return dateString
  }
}

export function getEventDay(dateString: string): string {
  try {
    return format(new Date(dateString), 'dd')
  } catch {
    return '--'
  }
}

export function getEventMonth(dateString: string): string {
  try {
    return format(new Date(dateString), 'MMM', { locale: de }).toUpperCase()
  } catch {
    return '---'
  }
}

export function isEventPast(dateString: string): boolean {
  try {
    return isPast(new Date(dateString))
  } catch {
    return false
  }
}

export function isEventToday(dateString: string): boolean {
  try {
    return isToday(new Date(dateString))
  } catch {
    return false
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371 // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function getBundeslandName(id: string): string {
  const map: Record<string, string> = {
    be: 'Berlin',
    bb: 'Brandenburg',
    mv: 'Mecklenburg-Vorpommern',
    sn: 'Sachsen',
    st: 'Sachsen-Anhalt',
    th: 'Thüringen',
  }
  return map[id] || id
}
