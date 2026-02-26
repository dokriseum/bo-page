'use client'

import { useState } from 'react'
import {
  Bell,
  Calendar,
  BookOpen,
  Users,
  AlertTriangle,
  Check,
  CheckCheck,
  Trash2,
} from 'lucide-react'

interface Notification {
  id: number
  title: string
  message: string
  time: string
  type: 'event' | 'story' | 'user' | 'system'
  read: boolean
}

const mockNotifications: Notification[] = [
  { id: 1, title: 'Neues Event eingereicht', message: 'SOLI2026-Aktion Mützen wurde von Thomas Weber zur Überprüfung eingereicht.', time: 'Vor 15 Minuten', type: 'event', read: false },
  { id: 2, title: 'Geschichte zur Überprüfung', message: 'Sebastian hat eine neue Geschichte eingereicht, die auf Freigabe wartet.', time: 'Vor 1 Stunde', type: 'story', read: false },
  { id: 3, title: 'Neuer Benutzer registriert', message: 'Lisa Wagner hat sich registriert und wartet auf Bestätigung.', time: 'Vor 3 Stunden', type: 'user', read: false },
  { id: 4, title: 'Event aktualisiert', message: 'Ausstellung "Fluide Grenze" wurde von Petra Schneider bearbeitet.', time: 'Vor 5 Stunden', type: 'event', read: true },
  { id: 5, title: 'Systemhinweis', message: 'Die Plattform wird am 01.03.2026 für Wartungsarbeiten kurzzeitig offline sein.', time: 'Vor 1 Tag', type: 'system', read: true },
  { id: 6, title: 'Geschichte veröffentlicht', message: 'Die Geschichte von Frederike wurde automatisch veröffentlicht.', time: 'Vor 2 Tagen', type: 'story', read: true },
  { id: 7, title: 'Benutzer gesperrt', message: 'Hans Becker wurde wegen Verstoß gegen die Richtlinien gesperrt.', time: 'Vor 3 Tagen', type: 'user', read: true },
  { id: 8, title: 'Event beendet', message: 'Demokratie-Forum Ost wurde automatisch als beendet markiert.', time: 'Vor 5 Tagen', type: 'event', read: true },
]

const typeIcons = { event: Calendar, story: BookOpen, user: Users, system: AlertTriangle }
const typeColors = {
  event: 'bg-blue-500/20 text-blue-400',
  story: 'bg-cyan-500/20 text-cyan-400',
  user: 'bg-emerald-500/20 text-emerald-400',
  system: 'bg-amber-500/20 text-amber-400',
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState<'alle' | 'ungelesen'>('alle')

  const unreadCount = notifications.filter(n => !n.read).length
  const displayed = filter === 'ungelesen' ? notifications.filter(n => !n.read) : notifications

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  const toggleRead = (id: number) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n))
  const deleteNotif = (id: number) => setNotifications(prev => prev.filter(n => n.id !== id))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-medium text-foreground">Benachrichtigungen</h1>
          <p className="text-[14px] text-muted-foreground mt-1">{unreadCount} ungelesen</p>
        </div>
        <button onClick={markAllRead} className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium">
          <CheckCheck className="w-4 h-4" />
          Alle als gelesen markieren
        </button>
      </div>

      <div className="flex gap-2">
        {(['alle', 'ungelesen'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-2 rounded-lg text-[13px] capitalize transition-colors font-medium ${
              filter === f ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {f === 'alle' ? 'Alle' : `Ungelesen (${unreadCount})`}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {displayed.map(n => {
          const Icon = typeIcons[n.type]
          return (
            <div key={n.id} className={`bg-card rounded-xl border border-border p-4 flex items-start gap-4 transition-colors ${!n.read ? 'border-primary/30 bg-primary/5' : ''}`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${typeColors[n.type]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[14px] text-foreground">{n.title}</p>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                </div>
                <p className="text-[13px] text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-[12px] text-muted-foreground mt-1">{n.time}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => toggleRead(n.id)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground" title={n.read ? 'Als ungelesen markieren' : 'Als gelesen markieren'}>
                  <Check className="w-4 h-4" />
                </button>
                <button onClick={() => deleteNotif(n.id)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-red-400" title="Löschen">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
        {displayed.length === 0 && (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">Keine Benachrichtigungen</p>
          </div>
        )}
      </div>
    </div>
  )
}
