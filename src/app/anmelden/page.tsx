'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/'
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${redirect}`,
        shouldCreateUser: true,
      },
    })

    if (authError) {
      setError(authError.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="text-center">
        <CheckCircle size={48} className="mx-auto mb-4" style={{ color: '#22c55e' }} />
        <h2 className="text-xl font-bold text-white mb-2">E-Mail gesendet!</h2>
        <p className="text-sm" style={{ color: '#8892a4' }}>
          Wir haben dir einen Login-Link an <strong className="text-white">{email}</strong> gesendet.
          Klicke auf den Link in der E-Mail um dich anzumelden.
        </p>
        <p className="text-xs mt-4" style={{ color: '#4a5568' }}>
          Kein E-Mail erhalten?{' '}
          <button
            onClick={() => setSent(false)}
            className="underline hover:text-blue-400 transition-colors"
            style={{ color: '#60a5fa' }}
          >
            Erneut versuchen
          </button>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="form-label" htmlFor="email">E-Mail-Adresse</label>
        <div className="relative">
          <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#4a5568' }} />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="deine@email.de"
            className="form-input pl-9"
            required
            autoFocus
          />
        </div>
      </div>

      {error && (
        <div
          className="flex items-start gap-2 p-3 rounded-lg text-xs"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}
        >
          <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all"
        style={{
          background: loading ? '#374151' : 'linear-gradient(135deg, #7c3aed, #ec4899)',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Wird gesendet…' : 'Login-Link senden'}
      </button>

      <p className="text-xs text-center" style={{ color: '#4a5568' }}>
        Kein Passwort nötig. Du erhältst einen sicheren Einmal-Link per E-Mail.
      </p>
    </form>
  )
}

export default function AnmeldenPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Willkommen zurück</h1>
          <p className="text-sm" style={{ color: '#8892a4' }}>
            Melde dich mit deiner E-Mail an – ohne Passwort.
          </p>
        </div>

        <div
          className="rounded-xl p-6"
          style={{ background: '#161b27', border: '1px solid #2d3748' }}
        >
          <Suspense fallback={<div className="text-sm text-gray-500">Lädt…</div>}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="text-xs text-center mt-4" style={{ color: '#4a5568' }}>
          Noch keinen Account?{' '}
          <span style={{ color: '#8892a4' }}>
            Beim ersten Login wird dein Account automatisch erstellt.
          </span>
        </p>

        <div className="mt-4 text-center">
          <Link href="/" className="text-xs hover:text-blue-300 transition-colors" style={{ color: '#4a5568' }}>
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  )
}
