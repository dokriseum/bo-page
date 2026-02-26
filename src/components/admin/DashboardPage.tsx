'use client'

import {
  Calendar,
  BookOpen,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MapPin,
  Clock,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

const visitorData = [
  { month: 'Jan', besucher: 1200, events: 3 },
  { month: 'Feb', besucher: 1800, events: 5 },
  { month: 'Mär', besucher: 1400, events: 4 },
  { month: 'Apr', besucher: 2200, events: 7 },
  { month: 'Mai', besucher: 2800, events: 6 },
  { month: 'Jun', besucher: 3200, events: 8 },
  { month: 'Jul', besucher: 2900, events: 5 },
  { month: 'Aug', besucher: 3400, events: 9 },
  { month: 'Sep', besucher: 3100, events: 7 },
  { month: 'Okt', besucher: 3800, events: 10 },
  { month: 'Nov', besucher: 4200, events: 12 },
  { month: 'Dez', besucher: 3900, events: 8 },
]

const regionData = [
  { region: 'Sachsen', events: 24 },
  { region: 'Thüringen', events: 18 },
  { region: 'Brandenburg', events: 15 },
  { region: 'Berlin', events: 22 },
  { region: 'Sachsen-Anhalt', events: 12 },
  { region: 'Mecklenburg-VP', events: 8 },
]

const recentActivities = [
  {
    action: 'Event erstellt',
    detail: 'SOLI2026-Aktion Mützen, Stulpen & Co.',
    time: 'Vor 2 Stunden',
    type: 'event',
  },
  {
    action: 'Geschichte veröffentlicht',
    detail: 'Ilko-Sascha Kowalczuk - Festrede',
    time: 'Vor 5 Stunden',
    type: 'story',
  },
  {
    action: 'Neuer Benutzer',
    detail: 'maria.schmidt@example.de registriert',
    time: 'Vor 8 Stunden',
    type: 'user',
  },
  {
    action: 'Event aktualisiert',
    detail: 'Ausstellung "Fluide Grenze"',
    time: 'Vor 12 Stunden',
    type: 'event',
  },
  {
    action: 'Geschichte bearbeitet',
    detail: 'Katja - Erinnerungen an die Wende',
    time: 'Vor 1 Tag',
    type: 'story',
  },
]

const stats = [
  {
    label: 'Aktive Events',
    value: '42',
    change: '+12%',
    up: true,
    icon: Calendar,
    color: 'from-blue-500 to-indigo-500',
  },
  {
    label: 'Geschichten',
    value: '128',
    change: '+8%',
    up: true,
    icon: BookOpen,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    label: 'Benutzer',
    value: '1.847',
    change: '+23%',
    up: true,
    icon: Users,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    label: 'Seitenaufrufe',
    value: '24.5K',
    change: '-3%',
    up: false,
    icon: Eye,
    color: 'from-amber-500 to-orange-500',
  },
]

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-medium text-foreground">Dashboard</h1>
        <p className="text-[14px] text-muted-foreground mt-1">
          Übersicht über die Bündnis OST Plattform
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-card rounded-xl border border-border p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span
                  className={`flex items-center gap-1 text-[13px] font-medium ${
                    stat.up ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {stat.up ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </span>
              </div>
              <p className="text-[28px] font-medium text-foreground">{stat.value}</p>
              <p className="text-[13px] text-muted-foreground">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-foreground font-medium mb-4">Besucher-Übersicht</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={visitorData}>
              <defs>
                <linearGradient id="colorBesucher" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,55,72,0.5)" />
              <XAxis dataKey="month" stroke="#8892a4" fontSize={12} />
              <YAxis stroke="#8892a4" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#161b27',
                  border: '1px solid #2d3748',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
              />
              <Area
                type="monotone"
                dataKey="besucher"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorBesucher)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-foreground font-medium mb-4">Events nach Region</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={regionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,55,72,0.5)" />
              <XAxis dataKey="region" stroke="#8892a4" fontSize={11} />
              <YAxis stroke="#8892a4" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#161b27',
                  border: '1px solid #2d3748',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
              />
              <Bar dataKey="events" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
          <h3 className="text-foreground font-medium mb-4">Letzte Aktivitäten</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    activity.type === 'event'
                      ? 'bg-blue-500/20 text-blue-400'
                      : activity.type === 'story'
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  {activity.type === 'event' ? (
                    <Calendar className="w-4 h-4" />
                  ) : activity.type === 'story' ? (
                    <BookOpen className="w-4 h-4" />
                  ) : (
                    <Users className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-foreground">{activity.action}</p>
                  <p className="text-[13px] text-muted-foreground truncate">
                    {activity.detail}
                  </p>
                </div>
                <span className="text-[12px] text-muted-foreground whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-foreground font-medium mb-4">Kommende Events</h3>
          <div className="space-y-3">
            {[
              {
                title: 'SOLI2026-Aktion',
                date: '31. Jul 2026',
                location: 'Dresden',
              },
              {
                title: 'Ausstellung "Fluide Grenze"',
                date: '20.11 - 30.11.2026',
                location: 'Leipzig',
              },
              {
                title: 'Frauen im geteilten Deutschland',
                date: '14.11.2026',
                location: 'Erfurt',
              },
              {
                title: 'Open-Source Workshop',
                date: '8.2.2026',
                location: 'Berlin',
              },
            ].map((event, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <p className="text-[14px] text-foreground truncate">
                  {event.title}
                </p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-[12px] text-muted-foreground">
                    <Clock className="w-3 h-3" /> {event.date}
                  </span>
                  <span className="flex items-center gap-1 text-[12px] text-muted-foreground">
                    <MapPin className="w-3 h-3" /> {event.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
