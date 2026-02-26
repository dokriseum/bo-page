'use client'

import { Search, Bell } from 'lucide-react'

interface AdminHeaderProps {
  activeTab: string
}

const titles: Record<string, string> = {
  dashboard: 'Dashboard',
  events: 'Events',
  stories: 'Geschichten',
  moderation: 'Moderation',
  users: 'Benutzer',
  notifications: 'Benachrichtigungen',
  website: 'Website',
  settings: 'Einstellungen',
}

export function AdminHeader({ activeTab }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Rainbow gradient bar - uses existing Bündnis OST diversity rainbow */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background:
            'linear-gradient(90deg, #e74c3c 0%, #f39c12 14%, #f1c40f 28%, #27ae60 42%, #16a085 56%, #3498db 70%, #9b59b6 85%, #e91e63 100%)',
          backgroundSize: '200% 100%',
          animation: 'stripeMove 8s linear infinite',
        }}
      />

      <div className="flex items-center gap-4">
        <h2 className="text-foreground font-medium hidden sm:block">
          {titles[activeTab] || 'Dashboard'}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Suchen..."
            className="pl-9 pr-4 py-2 bg-secondary border border-border rounded-lg text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-60"
          />
        </div>

        <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-card" />
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[12px] font-semibold">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-[13px] text-foreground">Admin</p>
            <p className="text-[11px] text-muted-foreground">
              admin@buendnisost.de
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
