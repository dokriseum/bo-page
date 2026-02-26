'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  Globe,
  ShieldCheck,
} from 'lucide-react'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  pendingModerationCount?: number
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'stories', label: 'Geschichten', icon: BookOpen },
  { id: 'moderation', label: 'Moderation', icon: ShieldCheck, badge: true },
  { id: 'users', label: 'Benutzer', icon: Users },
  { id: 'notifications', label: 'Benachrichtigungen', icon: Bell },
  { id: 'website', label: 'Website', icon: Globe },
  { id: 'settings', label: 'Einstellungen', icon: Settings },
]

export function AdminSidebar({ activeTab, onTabChange, pendingModerationCount = 0 }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 sticky top-0`}
    >
      {/* Logo */}
      <div className="p-4 flex items-center gap-3 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#ec4899] flex items-center justify-center shrink-0">
          <span className="text-white text-[12px] font-bold">BO</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h2 className="text-[14px] font-medium text-sidebar-foreground truncate">
              Bündnis OST
            </h2>
            <p className="text-[11px] text-muted-foreground truncate">
              Admin Panel
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative ${
                isActive
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && (
                <span className="text-[14px] truncate flex-1 text-left">{item.label}</span>
              )}
              {!collapsed && (item as any).badge && pendingModerationCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-semibold min-w-[20px] text-center">
                  {pendingModerationCount}
                </span>
              )}
              {collapsed && (item as any).badge && pendingModerationCount > 0 && (
                <span className="absolute right-1 top-0.5 w-2 h-2 rounded-full bg-amber-500" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t border-sidebar-border space-y-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 shrink-0" />
          ) : (
            <ChevronLeft className="w-5 h-5 shrink-0" />
          )}
          {!collapsed && <span className="text-[14px]">Einklappen</span>}
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors">
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-[14px]">Abmelden</span>}
        </button>
      </div>
    </aside>
  )
}
