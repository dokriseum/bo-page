'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import {
  Home,
  Calendar,
  BookOpen,
  Network,
  Info,
  Bell,
  Plus,
  LogIn,
  LogOut,
  User as UserIcon,
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/geschichten', label: 'Geschichten', icon: BookOpen },
  { href: '/netzwerk', label: 'Netzwerk', icon: Network },
  { href: '/ueber-uns', label: 'Über uns', icon: Info },
]

export default function Navigation() {
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  function isActive(href: string): boolean {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav
      className="sticky top-0 z-40 w-full"
      style={{ background: '#0f1623', borderBottom: '1px solid #1e2535' }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14 gap-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 via-blue-400 to-green-400 flex items-center justify-content-center flex-shrink-0">
            {/* Bündnis OST Logo placeholder */}
            <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
              <circle cx="16" cy="16" r="16" fill="url(#logoGrad)" />
              <text x="16" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">B</text>
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
                  <stop stopColor="#9b59b6" />
                  <stop offset="0.5" stopColor="#3498db" />
                  <stop offset="1" stopColor="#27ae60" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="text-sm font-bold text-white">Bündnis OST</div>
            <div className="text-xs text-gray-500 leading-tight">Ostsicht schärfen, Netzwerke stärken.</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`nav-pill ${isActive(href) ? 'active' : ''}`}
            >
              <Icon size={14} />
              <span>{label}</span>
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Notification bell */}
          <button
            className="hidden sm:flex w-8 h-8 items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Benachrichtigungen"
          >
            <Bell size={16} />
          </button>

          {/* User avatar indicator */}
          {user && (
            <div className="hidden sm:flex items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <UserIcon size={12} className="text-white" />
              </div>
            </div>
          )}

          {/* Create event button */}
          <Link href="/events/create" className="btn-create">
            <Plus size={14} />
            <span className="hidden sm:inline">Erstellen</span>
          </Link>

          {/* Auth button */}
          {!loading && (
            user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="btn-login"
                >
                  <UserIcon size={14} className="mr-1" />
                  <span className="hidden sm:inline">Profil</span>
                </button>
                {menuOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl overflow-hidden shadow-xl z-50"
                    style={{ background: '#1e2535', border: '1px solid #2d3748' }}
                  >
                    <Link
                      href="/profil"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      <UserIcon size={14} />
                      Mein Profil
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-white/5 transition-colors"
                    >
                      <LogOut size={14} />
                      Abmelden
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/anmelden" className="btn-login">
                <LogIn size={14} className="mr-1" />
                <span className="hidden sm:inline">Anmelden</span>
              </Link>
            )
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1 p-2 text-gray-400"
            aria-label="Menü öffnen"
          >
            <span className="w-5 h-0.5 bg-current" />
            <span className="w-5 h-0.5 bg-current" />
            <span className="w-5 h-0.5 bg-current" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {menuOpen && (
        <div
          className="md:hidden absolute w-full z-50"
          style={{ background: '#0f1623', borderBottom: '1px solid #1e2535' }}
        >
          <div className="px-4 py-3 flex flex-col gap-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`nav-pill justify-start ${isActive(href) ? 'active' : ''}`}
              >
                <Icon size={14} />
                <span>{label}</span>
              </Link>
            ))}
            <div className="border-t my-2" style={{ borderColor: '#2d3748' }} />
            {user ? (
              <button
                onClick={handleSignOut}
                className="nav-pill justify-start text-red-400 hover:text-red-300"
              >
                <LogOut size={14} />
                <span>Abmelden</span>
              </button>
            ) : (
              <Link
                href="/anmelden"
                onClick={() => setMenuOpen(false)}
                className="nav-pill justify-start"
              >
                <LogIn size={14} />
                <span>Anmelden</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
