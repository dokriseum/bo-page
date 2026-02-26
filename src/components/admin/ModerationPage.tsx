'use client'

import { useState } from 'react'
import {
  ShieldCheck,
  ShieldAlert,
  ShieldOff,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  BookOpen,
  Clock,
  User,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  ArrowRight,
  ToggleLeft,
  ToggleRight,
  Info,
} from 'lucide-react'
import { useModeration } from './ModerationContext'

type ModerationStatus = 'ausstehend' | 'genehmigt' | 'abgelehnt'
type ContentType = 'event' | 'story'

interface ModerationItem {
  id: number
  type: ContentType
  title: string
  author: string
  authorEmail: string
  submittedAt: string
  status: ModerationStatus
  content: string
  category: string
  reason?: string
  moderatedBy?: string
  moderatedAt?: string
  flagReason?: string
}

const initialItems: ModerationItem[] = [
  { id: 1, type: 'event', title: 'SOLI2026-Aktion Mützen, Stulpen & Co.', author: 'Thomas Weber', authorEmail: 't.weber@example.de', submittedAt: 'Vor 2 Stunden', status: 'ausstehend', content: 'Gemeinsam stricken wir Mützen, Stulpen und Schals für Bedürftige in der Region. Ein Solidaritätsprojekt, das Wärme schenkt - nicht nur materiell, sondern auch zwischenmenschlich.', category: 'Solidarität' },
  { id: 2, type: 'story', title: 'Erinnerungen an die Wende', author: 'Sebastian', authorEmail: 'sebastian@example.de', submittedAt: 'Vor 5 Stunden', status: 'ausstehend', content: 'Ich bin ein paar Jahre jünger, aber auch ich saß mit 18 bei der Stasi und nachdem sie mich 3 Tage lang verhört haben, war ich so eingeschüchtert, dass ich alles unterschrieben habe.', category: 'Erfahrungsbericht' },
  { id: 3, type: 'event', title: 'Demokratie-Workshop für Jugendliche', author: 'Maria Schmidt', authorEmail: 'maria.s@example.de', submittedAt: 'Vor 8 Stunden', status: 'ausstehend', content: 'Ein interaktiver Workshop für Jugendliche zwischen 14 und 18 Jahren. Gemeinsam diskutieren wir über demokratische Werte, Bürgerbeteiligung und was junge Menschen verändern können.', category: 'Workshop' },
  { id: 4, type: 'story', title: 'Mein Weg nach der Wiedervereinigung', author: 'Katja', authorEmail: 'katja@example.de', submittedAt: 'Vor 1 Tag', status: 'ausstehend', content: 'In der DDR geboren, meine Eltern mussten sich komplett neu orientieren, da die Berufe, die sie gelernt hatten, plötzlich nichts mehr wert waren.', category: 'Erfahrungsbericht', flagReason: 'Enthält möglicherweise persönliche Daten Dritter' },
  { id: 5, type: 'event', title: 'Netzwerk-Abend Leipzig', author: 'Klaus Fischer', authorEmail: 'k.fischer@example.de', submittedAt: 'Vor 1 Tag', status: 'genehmigt', content: 'Gemütlicher Netzwerk-Abend für alle Engagierten in und um Leipzig.', category: 'Netzwerk', moderatedBy: 'Anna Müller', moderatedAt: 'Vor 6 Stunden' },
  { id: 6, type: 'story', title: 'Die Stimme des Ostens', author: 'Frederike', authorEmail: 'frederike@example.de', submittedAt: 'Vor 2 Tagen', status: 'genehmigt', content: 'Und dann diese über Generationen und 2 Diktaturen ererbte Feindseligkeit gegenüber "dem Staat"...', category: 'Erfahrungsbericht', moderatedBy: 'Petra Schneider', moderatedAt: 'Vor 1 Tag' },
  { id: 7, type: 'event', title: 'Verdächtiges Event', author: 'Unbekannter Nutzer', authorEmail: 'test123@temp.de', submittedAt: 'Vor 3 Tagen', status: 'abgelehnt', content: 'Kommerzielles Event ohne Bezug zur Plattform.', category: 'Sonstiges', reason: 'Spam / Kommerzieller Inhalt ohne Plattform-Bezug', moderatedBy: 'Anna Müller', moderatedAt: 'Vor 2 Tagen' },
  { id: 8, type: 'story', title: 'Hassrede-Beitrag', author: 'Hans Becker', authorEmail: 'h.becker@example.de', submittedAt: 'Vor 4 Tagen', status: 'abgelehnt', content: '[Inhalt ausgeblendet - Verstoß gegen Richtlinien]', category: 'Sonstiges', reason: 'Verstoß gegen Community-Richtlinien: Diskriminierende Inhalte', moderatedBy: 'Petra Schneider', moderatedAt: 'Vor 3 Tagen' },
]

const statusConfig = {
  ausstehend: { color: 'bg-amber-500/20 text-amber-400', icon: ShieldAlert, label: 'Ausstehend' },
  genehmigt: { color: 'bg-emerald-500/20 text-emerald-400', icon: ShieldCheck, label: 'Genehmigt' },
  abgelehnt: { color: 'bg-red-500/20 text-red-400', icon: ShieldOff, label: 'Abgelehnt' },
}

export function ModerationPage() {
  const { settings, toggleEventModeration, toggleStoryModeration } = useModeration()
  const [items, setItems] = useState<ModerationItem[]>(initialItems)
  const [statusFilter, setStatusFilter] = useState<string>('ausstehend')
  const [typeFilter, setTypeFilter] = useState<string>('alle')
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [rejectReasonId, setRejectReasonId] = useState<number | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const pendingCount = items.filter((i) => i.status === 'ausstehend').length
  const approvedCount = items.filter((i) => i.status === 'genehmigt').length
  const rejectedCount = items.filter((i) => i.status === 'abgelehnt').length

  const filtered = items.filter((i) => {
    const matchStatus = statusFilter === 'alle' || i.status === statusFilter
    const matchType = typeFilter === 'alle' || i.type === typeFilter
    return matchStatus && matchType
  })

  const handleApprove = (id: number) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: 'genehmigt' as ModerationStatus, moderatedBy: 'Admin', moderatedAt: 'Gerade eben' } : i))
    setExpandedId(null)
  }

  const handleReject = (id: number) => {
    if (rejectReasonId === id && rejectReason.trim()) {
      setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: 'abgelehnt' as ModerationStatus, reason: rejectReason, moderatedBy: 'Admin', moderatedAt: 'Gerade eben' } : i))
      setRejectReasonId(null)
      setRejectReason('')
      setExpandedId(null)
    } else {
      setRejectReasonId(id)
    }
  }

  const handleResetToPending = (id: number) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: 'ausstehend' as ModerationStatus, moderatedBy: undefined, moderatedAt: undefined, reason: undefined } : i))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-medium text-foreground">Moderation</h1>
          <p className="text-[14px] text-muted-foreground mt-1">Beiträge überprüfen und freigeben</p>
        </div>
      </div>

      {/* Moderation Toggles Banner */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-primary" />
          <h3 className="text-foreground font-medium">Moderations-Modus</h3>
        </div>
        <p className="text-[13px] text-muted-foreground mb-4">Lege fest, ob neue Beiträge vor der Veröffentlichung von einem Moderator freigegeben werden müssen.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${settings.eventModerationEnabled ? 'bg-primary/5 border-primary/30' : 'bg-secondary/50 border-border'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${settings.eventModerationEnabled ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}`}>
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[14px] text-foreground">Event-Moderation</p>
                <p className="text-[12px] text-muted-foreground">{settings.eventModerationEnabled ? 'Events müssen freigegeben werden' : 'Events werden direkt veröffentlicht'}</p>
              </div>
            </div>
            <button onClick={toggleEventModeration} className="shrink-0" aria-label="Event-Moderation umschalten">
              {settings.eventModerationEnabled ? <ToggleRight className="w-10 h-10 text-primary" /> : <ToggleLeft className="w-10 h-10 text-muted-foreground" />}
            </button>
          </div>
          <div className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${settings.storyModerationEnabled ? 'bg-primary/5 border-primary/30' : 'bg-secondary/50 border-border'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${settings.storyModerationEnabled ? 'bg-cyan-500/20 text-cyan-400' : 'bg-gray-500/20 text-gray-400'}`}>
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[14px] text-foreground">Geschichten-Moderation</p>
                <p className="text-[12px] text-muted-foreground">{settings.storyModerationEnabled ? 'Geschichten müssen freigegeben werden' : 'Geschichten werden direkt veröffentlicht'}</p>
              </div>
            </div>
            <button onClick={toggleStoryModeration} className="shrink-0" aria-label="Geschichten-Moderation umschalten">
              {settings.storyModerationEnabled ? <ToggleRight className="w-10 h-10 text-primary" /> : <ToggleLeft className="w-10 h-10 text-muted-foreground" />}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center"><ShieldAlert className="w-6 h-6 text-amber-400" /></div>
          <div><p className="text-[28px] font-medium text-foreground">{pendingCount}</p><p className="text-[13px] text-muted-foreground">Ausstehend</p></div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center"><ShieldCheck className="w-6 h-6 text-emerald-400" /></div>
          <div><p className="text-[28px] font-medium text-foreground">{approvedCount}</p><p className="text-[13px] text-muted-foreground">Genehmigt</p></div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center"><ShieldOff className="w-6 h-6 text-red-400" /></div>
          <div><p className="text-[28px] font-medium text-foreground">{rejectedCount}</p><p className="text-[13px] text-muted-foreground">Abgelehnt</p></div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2">
          {[
            { key: 'ausstehend', label: `Ausstehend (${pendingCount})` },
            { key: 'genehmigt', label: 'Genehmigt' },
            { key: 'abgelehnt', label: 'Abgelehnt' },
            { key: 'alle', label: 'Alle' },
          ].map((f) => (
            <button key={f.key} onClick={() => setStatusFilter(f.key)} className={`px-3 py-2 rounded-lg text-[13px] transition-colors whitespace-nowrap font-medium ${statusFilter === f.key ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 sm:ml-auto">
          {[
            { key: 'alle', label: 'Alle Typen' },
            { key: 'event', label: 'Events' },
            { key: 'story', label: 'Geschichten' },
          ].map((f) => (
            <button key={f.key} onClick={() => setTypeFilter(f.key)} className={`px-3 py-2 rounded-lg text-[13px] transition-colors font-medium ${typeFilter === f.key ? 'bg-secondary text-foreground border border-border' : 'text-muted-foreground hover:text-foreground'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Moderation Queue */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <ShieldCheck className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-foreground mb-1">Keine Beiträge in dieser Ansicht</p>
            <p className="text-[13px] text-muted-foreground">{statusFilter === 'ausstehend' ? 'Alle Beiträge wurden moderiert.' : 'Wähle einen anderen Filter.'}</p>
          </div>
        )}

        {filtered.map((item) => {
          const config = statusConfig[item.status]
          const StatusIcon = config.icon
          const isExpanded = expandedId === item.id
          const isRejectMode = rejectReasonId === item.id

          return (
            <div key={item.id} className={`bg-card rounded-xl border transition-colors ${item.status === 'ausstehend' ? 'border-amber-500/30' : 'border-border'}`}>
              <div className="flex items-center gap-4 p-5 cursor-pointer hover:bg-secondary/20 transition-colors" onClick={() => setExpandedId(isExpanded ? null : item.id)}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.type === 'event' ? 'bg-blue-500/20 text-blue-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                  {item.type === 'event' ? <Calendar className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-[14px] text-foreground truncate">{item.title}</p>
                    {item.flagReason && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[11px]">
                        <AlertTriangle className="w-3 h-3" /> Markiert
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    <span className="flex items-center gap-1 text-[12px] text-muted-foreground"><User className="w-3 h-3" /> {item.author}</span>
                    <span className="flex items-center gap-1 text-[12px] text-muted-foreground"><Clock className="w-3 h-3" /> {item.submittedAt}</span>
                    <span className="text-[12px] text-muted-foreground">{item.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium ${config.color}`}>
                    <StatusIcon className="w-3.5 h-3.5" /> {config.label}
                  </span>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-border">
                  <div className="p-5 space-y-4">
                    <div>
                      <label className="text-[12px] text-muted-foreground uppercase tracking-wider block mb-2">Inhalt</label>
                      <div className="bg-secondary/50 rounded-lg p-4">
                        <p className="text-[14px] text-foreground whitespace-pre-wrap">{item.content}</p>
                      </div>
                    </div>
                    {item.flagReason && (
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[13px] text-amber-300">Automatische Markierung</p>
                          <p className="text-[13px] text-muted-foreground">{item.flagReason}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[13px] font-semibold shrink-0">{item.author.charAt(0)}</div>
                      <div>
                        <p className="text-[14px] text-foreground">{item.author}</p>
                        <p className="text-[12px] text-muted-foreground">{item.authorEmail}</p>
                      </div>
                    </div>
                    {item.status === 'abgelehnt' && item.reason && (
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[13px] text-red-300">Ablehnungsgrund</p>
                          <p className="text-[13px] text-muted-foreground">{item.reason}</p>
                        </div>
                      </div>
                    )}
                    {item.moderatedBy && (
                      <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                        <ShieldCheck className="w-3.5 h-3.5" /> Moderiert von {item.moderatedBy} &middot; {item.moderatedAt}
                      </div>
                    )}
                    {isRejectMode && (
                      <div className="space-y-2">
                        <label className="text-[13px] text-muted-foreground block">Grund für die Ablehnung *</label>
                        <textarea rows={3} value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="Bitte gib einen Grund für die Ablehnung an..." className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none" autoFocus />
                      </div>
                    )}
                    <div className="flex items-center gap-3 pt-2">
                      {item.status === 'ausstehend' && (
                        <>
                          <button onClick={() => handleApprove(item.id)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium">
                            <CheckCircle className="w-4 h-4" /> Freigeben
                          </button>
                          <button onClick={() => handleReject(item.id)} className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors font-medium ${isRejectMode && rejectReason.trim() ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'}`}>
                            <XCircle className="w-4 h-4" /> {isRejectMode ? (rejectReason.trim() ? 'Ablehnung bestätigen' : 'Grund eingeben...') : 'Ablehnen'}
                          </button>
                          {isRejectMode && (
                            <button onClick={() => { setRejectReasonId(null); setRejectReason('') }} className="px-3 py-2.5 text-muted-foreground text-[13px] hover:text-foreground transition-colors">Abbrechen</button>
                          )}
                        </>
                      )}
                      {(item.status === 'genehmigt' || item.status === 'abgelehnt') && (
                        <button onClick={() => handleResetToPending(item.id)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium">
                          <ArrowRight className="w-4 h-4" /> Zurück auf Ausstehend setzen
                        </button>
                      )}
                      <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium ml-auto">
                        <Eye className="w-4 h-4" /> Vorschau
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
