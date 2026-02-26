'use client'

import { useState } from 'react'
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Headphones,
  FileText,
} from 'lucide-react'

interface Story {
  id: number
  author: string
  excerpt: string
  date: string
  status: 'veröffentlicht' | 'entwurf' | 'überprüfung'
  type: 'text' | 'audio' | 'video'
  category: string
  views: number
}

const mockStories: Story[] = [
  { id: 1, author: 'FB Kommentar', excerpt: 'Ich bin gerade erst fertig geworden. Das Buch ist ja auch gerade erst erschienen...', date: '27. Nov. 2025', status: 'veröffentlicht', type: 'text', category: 'Erfahrungsbericht', views: 342 },
  { id: 2, author: 'Ilko-Sascha Kowalczuk', excerpt: 'Festrede zum 35-jährigen Bestehen des Thüringer Landtags Aufzeichnung der...', date: '24. Nov. 2025', status: 'veröffentlicht', type: 'audio', category: 'Erfahrungsbericht', views: 1205 },
  { id: 3, author: 'Katja', excerpt: 'Ich erinnere mich noch sehr genau an eine extrem intensive Erfahrung, die mena...', date: '24. Nov. 2025', status: 'veröffentlicht', type: 'text', category: 'Erfahrungsbericht', views: 187 },
  { id: 4, author: 'Friedrich', excerpt: 'Ich bin geboren in einem Land, das es nicht mehr gibt. Ich lebe mein...', date: '24. Nov. 2025', status: 'veröffentlicht', type: 'text', category: 'Erfahrungsbericht', views: 156 },
  { id: 5, author: 'Sebastian', excerpt: 'Ich bin ein paar Jahre jünger, aber auch ich saß mit 18 bei der Stasi und nachdem sie...', date: '24. Nov. 2025', status: 'überprüfung', type: 'text', category: 'Erfahrungsbericht', views: 89 },
  { id: 6, author: 'Katja', excerpt: 'In der DDR geboren, meine Eltern mussten sich komplett neu orientieren, da die...', date: '24. Nov. 2025', status: 'entwurf', type: 'text', category: 'Erfahrungsbericht', views: 0 },
  { id: 7, author: 'Frederike', excerpt: 'Und dann diese über Generationen und 2 Diktaturen ererbte Feindseligkeit gegenüber...', date: '24. Nov. 2025', status: 'veröffentlicht', type: 'text', category: 'Erfahrungsbericht', views: 234 },
  { id: 8, author: 'Anja', excerpt: 'Ich kann mich auch noch erinnern an einen leichten Schock 1989: Wir lebten in...', date: '24. Nov. 2025', status: 'veröffentlicht', type: 'text', category: 'Erfahrungsbericht', views: 178 },
]

const statusColors = {
  'veröffentlicht': 'bg-emerald-500/20 text-emerald-400',
  entwurf: 'bg-amber-500/20 text-amber-400',
  'überprüfung': 'bg-blue-500/20 text-blue-400',
}

const typeIcons = {
  text: FileText,
  audio: Headphones,
  video: BookOpen,
}

export function StoriesPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('alle')
  const [showDropdown, setShowDropdown] = useState<number | null>(null)

  const filtered = mockStories.filter((s) => {
    const matchSearch =
      s.author.toLowerCase().includes(search.toLowerCase()) ||
      s.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'alle' || s.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-medium text-foreground">Geschichten verwalten</h1>
          <p className="text-[14px] text-muted-foreground mt-1">
            {mockStories.length} Geschichten insgesamt
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
          <Plus className="w-4 h-4" />
          Neue Geschichte
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Geschichten suchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex gap-2">
          {['alle', 'veröffentlicht', 'entwurf', 'überprüfung'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-[13px] capitalize transition-colors whitespace-nowrap font-medium ${
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

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((story) => {
          const TypeIcon = typeIcons[story.type]
          return (
            <div
              key={story.id}
              className="bg-card rounded-xl border border-border p-5 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-[13px] font-semibold">
                    {story.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[14px] text-foreground">{story.author}</p>
                    <p className="text-[12px] text-muted-foreground">{story.date}</p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(showDropdown === story.id ? null : story.id)}
                    className="p-1 rounded hover:bg-secondary transition-colors text-muted-foreground"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {showDropdown === story.id && (
                    <div className="absolute right-0 top-7 w-36 bg-popover border border-border rounded-lg shadow-xl z-10 py-1">
                      <button onClick={() => setShowDropdown(null)} className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-foreground hover:bg-secondary">
                        <Eye className="w-3.5 h-3.5" /> Anzeigen
                      </button>
                      <button onClick={() => setShowDropdown(null)} className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-foreground hover:bg-secondary">
                        <Edit className="w-3.5 h-3.5" /> Bearbeiten
                      </button>
                      <button onClick={() => setShowDropdown(null)} className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-red-400 hover:bg-secondary">
                        <Trash2 className="w-3.5 h-3.5" /> Löschen
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-[13px] text-muted-foreground line-clamp-2 mb-3">
                {story.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium ${statusColors[story.status]}`}>
                    {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-[11px]">
                    <TypeIcon className="w-3 h-3" />
                    {story.type.charAt(0).toUpperCase() + story.type.slice(1)}
                  </span>
                </div>
                <span className="text-[12px] text-muted-foreground">
                  {story.views} Aufrufe
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
