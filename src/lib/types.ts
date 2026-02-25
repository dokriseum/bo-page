export type EventType = 'standard' | 'machbar'

export interface Event {
  id: string
  title: string
  description: string | null
  type: EventType
  start_date: string
  end_date: string | null
  location_name: string | null
  location_address: string | null
  location_lat: number | null
  location_lng: number | null
  bundesland: string | null
  kreis: string | null
  image_url: string | null
  organizer_id: string | null
  organizer_name: string | null
  is_verified: boolean
  helpers_needed: boolean
  helpers_description: string | null
  contact_info: string | null
  website_url: string | null
  tags: string[] | null
  created_at: string
  updated_at: string
}

export interface Story {
  id: string
  title: string | null
  author_name: string
  excerpt: string | null
  full_text: string
  image_url: string | null
  audio_url: string | null
  video_url: string | null
  location: string | null
  age: number | null
  author_id: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export type UserRole = 'user' | 'admin'

export interface Profile {
  id: string
  email: string | null
  display_name: string | null
  avatar_url: string | null
  organization: string | null
  bio: string | null
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Organization {
  id: string
  name: string
  description: string | null
  website_url: string | null
  contact_email: string | null
  contact_name: string | null
  image_url: string | null
  bundesland: string | null
  city: string | null
  tags: string[] | null
  created_at: string
}

export type SortMode = 'date' | 'distance'
export type EventFilter = 'all' | 'standard' | 'machbar'

export const BUNDESLAENDER = [
  { id: 'be', name: 'Berlin', short: 'BE' },
  { id: 'bb', name: 'Brandenburg', short: 'BB' },
  { id: 'mv', name: 'Mecklenburg-Vorpommern', short: 'MV' },
  { id: 'sn', name: 'Sachsen', short: 'SN' },
  { id: 'st', name: 'Sachsen-Anhalt', short: 'ST' },
  { id: 'th', name: 'Thüringen', short: 'TH' },
] as const

export const DISTANCE_OPTIONS = [5, 10, 25, 50, 100] as const

export interface EventFiltersState {
  keyword: string
  location: string
  distance: number | null
  bundesland: string
  kreis: string
  showPast: boolean
  useCurrentLocation: boolean
  lat: number | null
  lng: number | null
}
