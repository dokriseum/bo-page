'use client'

import { useState } from 'react'
import {
  Plus,
  Search,
  MoreVertical,
  Calendar,
  MapPin,
  Clock,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react'
import { ImageWithFallback } from './ImageWithFallback'

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  status: 'aktiv' | 'entwurf' | 'beendet'
  attendees: number
  image: string
  category: string
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: 'SOLI2026-Aktion Mützen, Stulpen & Co.',
    date: '31.07.2026',
    time: '09:00 - 18:00',
    location: 'Dresden',
    status: 'aktiv',
    attendees: 45,
    image: 'https://images.unsplash.com/photo-1771340591381-e72f1b148b14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBldmVudCUyMGdhdGhlcmluZ3xlbnwxfHx8fDE3NzE5MDUwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Solidarität',
  },
  {
    id: 2,
    title: 'Ausstellung "Fluide Grenze"',
    date: '20.11.2026',
    time: '10:00 - 21:00',
    location: 'Leipzig',
    status: 'aktiv',
    attendees: 120,
    image: 'https://images.unsplash.com/photo-1569342380852-035f42d9ca41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBleGhpYml0aW9uJTIwZ2FsbGVyeXxlbnwxfHx8fDE3NzE5MTUyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Ausstellung',
  },
  {
    id: 3,
    title: 'Ausstellung "Frauen im geteilten Deutschland"',
    date: '14.11.2026',
    time: '11:00 - 18:00',
    location: 'Erfurt',
    status: 'entwurf',
    attendees: 0,
    image: 'https://images.unsplash.com/photo-1658761492656-a088d80f65c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xpdGljYWwlMjBzcGVlY2glMjBwb2RpdW18ZW58MXx8fHwxNzcxOTY4Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Ausstellung',
  },
  {
    id: 4,
    title: 'Petition: Open-Source-Arbeit als Ehrenamt',
    date: '08.02.2026',
    time: '10:00 - 16:00',
    location: 'Berlin',
    status: 'aktiv',
    attendees: 88,
    image: 'https://images.unsplash.com/photo-1646579886135-068c73800308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwc291cmNlJTIwdGVjaG5vbG9neSUyMHdvcmtzaG9wfGVufDF8fHx8MTc3MTk3OTg2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Petition',
  },
  {
    id: 5,
    title: 'Demokratie-Forum Ost',
    date: '15.03.2026',
    time: '14:00 - 20:00',
    location: 'Potsdam',
    status: 'beendet',
    attendees: 200,
    image: 'https://images.unsplash.com/photo-1771340591381-e72f1b148b14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBldmVudCUyMGdhdGhlcmluZ3xlbnwxfHx8fDE3NzE5MDUwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Forum',
  },
  {
    id: 6,
    title: 'Netzwerk-Treffen Sachsen',
    date: '22.04.2026',
    time: '16:00 - 22:00',
    location: 'Chemnitz',
    status: 'beendet',
    attendees: 67,
    image: 'https://images.unsplash.com/photo-1569342380852-035f42d9ca41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBleGhpYml0aW9uJTIwZ2FsbGVyeXxlbnwxfHx8fDE3NzE5MTUyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Netzwerk',
  },
]

const statusColors = {
  aktiv: 'bg-emerald-500/20 text-emerald-400',
  entwurf: 'bg-amber-500/20 text-amber-400',
  beendet: 'bg-gray-500/20 text-gray-400',
}

export function EventsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('alle')
  const [showDropdown, setShowDropdown] = useState<number | null>(null)

  const filtered = mockEvents.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase())
    const matchesStatus =
      statusFilter === 'alle' || e.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-medium text-foreground">Events verwalten</h1>
          <p className="text-[14px] text-muted-foreground mt-1">
            {mockEvents.length} Events insgesamt
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
          <Plus className="w-4 h-4" />
          Neues Event
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Events suchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex gap-2">
          {['alle', 'aktiv', 'entwurf', 'beendet'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-[13px] capitalize transition-colors font-medium ${
                statusFilter === s
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {s === 'alle' ? 'Alle' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-[13px] font-medium text-muted-foreground">Event</th>
                <th className="text-left px-5 py-3 text-[13px] font-medium text-muted-foreground">Datum & Zeit</th>
                <th className="text-left px-5 py-3 text-[13px] font-medium text-muted-foreground">Ort</th>
                <th className="text-left px-5 py-3 text-[13px] font-medium text-muted-foreground">Status</th>
                <th className="text-left px-5 py-3 text-[13px] font-medium text-muted-foreground">Teilnehmer</th>
                <th className="text-right px-5 py-3 text-[13px] font-medium text-muted-foreground">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <ImageWithFallback
                        src={event.image}
                        alt={event.title}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div>
                        <p className="text-[14px] text-foreground">{event.title}</p>
                        <p className="text-[12px] text-muted-foreground">{event.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5 text-[13px] text-foreground">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground mt-0.5">
                      <Clock className="w-3 h-3" />
                      {event.time}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5 text-[13px] text-foreground">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      {event.location}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-[12px] font-medium ${
                        statusColors[event.status]
                      }`}
                    >
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[13px] text-foreground">
                    {event.attendees}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setShowDropdown(showDropdown === event.id ? null : event.id)}
                        className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {showDropdown === event.id && (
                        <div className="absolute right-0 top-8 w-40 bg-popover border border-border rounded-lg shadow-xl z-10 py-1">
                          <button
                            onClick={() => setShowDropdown(null)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-foreground hover:bg-secondary transition-colors"
                          >
                            <Eye className="w-4 h-4" /> Anzeigen
                          </button>
                          <button
                            onClick={() => setShowDropdown(null)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-foreground hover:bg-secondary transition-colors"
                          >
                            <Edit className="w-4 h-4" /> Bearbeiten
                          </button>
                          <button
                            onClick={() => setShowDropdown(null)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-red-400 hover:bg-secondary transition-colors"
                          >
                            <Trash2 className="w-4 h-4" /> Löschen
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
