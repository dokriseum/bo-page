'use client'

import { useState } from 'react'
import {
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Shield,
  ShieldCheck,
  User,
  Ban,
  UserCheck,
} from 'lucide-react'

interface UserData {
  id: number
  name: string
  email: string
  role: 'admin' | 'moderator' | 'benutzer'
  status: 'aktiv' | 'gesperrt' | 'ausstehend'
  joinDate: string
  events: number
  stories: number
}

const mockUsers: UserData[] = [
  { id: 1, name: 'Anna Müller', email: 'anna.mueller@example.de', role: 'admin', status: 'aktiv', joinDate: '15.01.2025', events: 12, stories: 3 },
  { id: 2, name: 'Thomas Weber', email: 't.weber@example.de', role: 'moderator', status: 'aktiv', joinDate: '22.03.2025', events: 8, stories: 5 },
  { id: 3, name: 'Maria Schmidt', email: 'maria.s@example.de', role: 'benutzer', status: 'aktiv', joinDate: '10.05.2025', events: 4, stories: 2 },
  { id: 4, name: 'Klaus Fischer', email: 'k.fischer@example.de', role: 'benutzer', status: 'aktiv', joinDate: '18.06.2025', events: 6, stories: 0 },
  { id: 5, name: 'Petra Schneider', email: 'petra.schneider@example.de', role: 'moderator', status: 'aktiv', joinDate: '02.07.2025', events: 15, stories: 7 },
  { id: 6, name: 'Hans Becker', email: 'h.becker@example.de', role: 'benutzer', status: 'gesperrt', joinDate: '14.08.2025', events: 1, stories: 0 },
  { id: 7, name: 'Lisa Wagner', email: 'l.wagner@example.de', role: 'benutzer', status: 'ausstehend', joinDate: '28.10.2025', events: 0, stories: 0 },
  { id: 8, name: 'Frank Hoffmann', email: 'frank.h@example.de', role: 'benutzer', status: 'aktiv', joinDate: '05.11.2025', events: 3, stories: 1 },
]

const roleIcons = { admin: ShieldCheck, moderator: Shield, benutzer: User }
const roleColors = {
  admin: 'bg-purple-500/20 text-purple-400',
  moderator: 'bg-blue-500/20 text-blue-400',
  benutzer: 'bg-gray-500/20 text-gray-400',
}
const statusColors = {
  aktiv: 'bg-emerald-500/20 text-emerald-400',
  gesperrt: 'bg-red-500/20 text-red-400',
  ausstehend: 'bg-amber-500/20 text-amber-400',
}

export function UsersPage() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('alle')
  const [showDropdown, setShowDropdown] = useState<number | null>(null)

  const filtered = mockUsers.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'alle' || u.role === roleFilter
    return matchSearch && matchRole
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-medium text-foreground">Benutzer verwalten</h1>
        <p className="text-[14px] text-muted-foreground mt-1">{mockUsers.length} Benutzer insgesamt</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Gesamt', value: mockUsers.length, color: 'from-blue-500 to-indigo-500' },
          { label: 'Aktiv', value: mockUsers.filter(u => u.status === 'aktiv').length, color: 'from-emerald-500 to-teal-500' },
          { label: 'Gesperrt', value: mockUsers.filter(u => u.status === 'gesperrt').length, color: 'from-red-500 to-rose-500' },
          { label: 'Ausstehend', value: mockUsers.filter(u => u.status === 'ausstehend').length, color: 'from-amber-500 to-orange-500' },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4">
            <p className="text-[28px] font-medium text-foreground">{s.value}</p>
            <p className="text-[13px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Benutzer suchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex gap-2">
          {['alle', 'admin', 'moderator', 'benutzer'].map(r => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-2 rounded-lg text-[13px] capitalize transition-colors font-medium ${
                roleFilter === r ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {r === 'alle' ? 'Alle' : r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-[13px] font-medium text-muted-foreground">Benutzer</th>
                <th className="text-left px-5 py-3 text-[13px] font-medium text-muted-foreground">Rolle</th>
                <th className="text-left px-5 py-3 text-[13px] font-medium text-muted-foreground">Status</th>
                <th className="text-left px-5 py-3 text-[13px] font-medium text-muted-foreground">Beigetreten</th>
                <th className="text-left px-5 py-3 text-[13px] font-medium text-muted-foreground">Events</th>
                <th className="text-left px-5 py-3 text-[13px] font-medium text-muted-foreground">Geschichten</th>
                <th className="text-right px-5 py-3 text-[13px] font-medium text-muted-foreground">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => {
                const RoleIcon = roleIcons[user.role]
                return (
                  <tr key={user.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[13px] font-semibold shrink-0">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[14px] text-foreground">{user.name}</p>
                          <p className="text-[12px] text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-medium ${roleColors[user.role]}`}>
                        <RoleIcon className="w-3 h-3" />
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[12px] font-medium ${statusColors[user.status]}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[13px] text-foreground">{user.joinDate}</td>
                    <td className="px-5 py-3 text-[13px] text-foreground">{user.events}</td>
                    <td className="px-5 py-3 text-[13px] text-foreground">{user.stories}</td>
                    <td className="px-5 py-3 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setShowDropdown(showDropdown === user.id ? null : user.id)}
                          className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {showDropdown === user.id && (
                          <div className="absolute right-0 top-8 w-40 bg-popover border border-border rounded-lg shadow-xl z-10 py-1">
                            <button onClick={() => setShowDropdown(null)} className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-foreground hover:bg-secondary">
                              <Edit className="w-4 h-4" /> Bearbeiten
                            </button>
                            {user.status === 'aktiv' ? (
                              <button onClick={() => setShowDropdown(null)} className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-amber-400 hover:bg-secondary">
                                <Ban className="w-4 h-4" /> Sperren
                              </button>
                            ) : (
                              <button onClick={() => setShowDropdown(null)} className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-emerald-400 hover:bg-secondary">
                                <UserCheck className="w-4 h-4" /> Aktivieren
                              </button>
                            )}
                            <button onClick={() => setShowDropdown(null)} className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-red-400 hover:bg-secondary">
                              <Trash2 className="w-4 h-4" /> Löschen
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
