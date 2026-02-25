'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Upload, MapPin, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { BUNDESLAENDER } from '@/lib/types'

export default function CreateEventPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'standard' as 'standard' | 'machbar',
    start_date: '',
    end_date: '',
    location_name: '',
    location_address: '',
    bundesland: '',
    kreis: '',
    organizer_name: '',
    contact_info: '',
    website_url: '',
    helpers_needed: false,
    helpers_description: '',
  })

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Bild darf maximal 5 MB groß sein.')
        return
      }
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      let imageUrl: string | null = null
      if (imageFile) {
        const ext = imageFile.name.split('.').pop()
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const { error: uploadError } = await supabase.storage
          .from('event-images')
          .upload(filename, imageFile)

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage
          .from('event-images')
          .getPublicUrl(filename)
        imageUrl = urlData.publicUrl
      }

      const { error: insertError, data } = await supabase
        .from('events')
        .insert({
          title: form.title.trim(),
          description: form.description.trim() || null,
          type: form.type,
          start_date: form.start_date,
          end_date: form.end_date || null,
          location_name: form.location_name.trim() || null,
          location_address: form.location_address.trim() || null,
          bundesland: form.bundesland || null,
          kreis: form.kreis.trim() || null,
          organizer_name: form.organizer_name.trim() || null,
          organizer_id: user?.id ?? null,
          contact_info: form.contact_info.trim() || null,
          website_url: form.website_url.trim() || null,
          helpers_needed: form.helpers_needed,
          helpers_description: form.helpers_needed ? form.helpers_description.trim() : null,
          image_url: imageUrl,
          is_verified: false,
        })
        .select()
        .single()

      if (insertError) throw insertError

      setSuccess(true)
      setTimeout(() => router.push(`/events/${data.id}`), 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Speichern. Bitte erneut versuchen.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-white mb-2">Event erfolgreich eingereicht!</h2>
        <p style={{ color: '#8892a4' }}>
          Dein Event wird nach Prüfung freigeschaltet. Du wirst weitergeleitet…
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/events"
        className="inline-flex items-center gap-1.5 text-sm mb-6 hover:text-blue-300 transition-colors"
        style={{ color: '#8892a4' }}
      >
        <ArrowLeft size={14} />
        Zurück
      </Link>

      <div
        className="rounded-xl p-6 md:p-8"
        style={{ background: '#161b27', border: '1px solid #2d3748' }}
      >
        <h1 className="text-2xl font-bold text-white mb-1">Event erstellen</h1>
        <p className="text-sm mb-6" style={{ color: '#8892a4' }}>
          Trage deine Veranstaltung ein. Nach einer kurzen Prüfung wird sie freigeschaltet.
        </p>

        {error && (
          <div
            className="flex items-start gap-2 p-3 rounded-lg text-sm mb-5"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}
          >
            <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Event Type */}
          <div>
            <label className="form-label">Event-Typ *</label>
            <div className="flex gap-3">
              {[
                { value: 'standard', label: 'Standard-Event', desc: 'Offene Teilnahme' },
                { value: 'machbar', label: 'MachBar-Event', desc: 'Helfer:innen gesucht' },
              ].map(({ value, label, desc }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => update('type', value)}
                  className="flex-1 p-3 rounded-xl text-left transition-all"
                  style={{
                    background:
                      form.type === value
                        ? value === 'machbar'
                          ? 'rgba(249,115,22,0.15)'
                          : 'rgba(59,130,246,0.15)'
                        : 'rgba(255,255,255,0.03)',
                    border: `2px solid ${
                      form.type === value
                        ? value === 'machbar'
                          ? 'rgba(249,115,22,0.4)'
                          : 'rgba(59,130,246,0.4)'
                        : '#2d3748'
                    }`,
                  }}
                >
                  <div
                    className="text-sm font-semibold"
                    style={{ color: form.type === value ? (value === 'machbar' ? '#fb923c' : '#60a5fa') : '#e2e8f0' }}
                  >
                    {label}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: '#4a5568' }}>{desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="form-label" htmlFor="title">Titel *</label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="Name der Veranstaltung"
              className="form-input"
              required
              maxLength={200}
            />
          </div>

          {/* Description */}
          <div>
            <label className="form-label" htmlFor="desc">Beschreibung</label>
            <textarea
              id="desc"
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder="Was erwartet die Teilnehmer:innen? Was ist das Ziel?"
              className="form-input"
              rows={4}
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label" htmlFor="start">Startdatum & Uhrzeit *</label>
              <input
                id="start"
                type="datetime-local"
                value={form.start_date}
                onChange={(e) => update('start_date', e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="form-label" htmlFor="end">Enddatum & Uhrzeit</label>
              <input
                id="end"
                type="datetime-local"
                value={form.end_date}
                onChange={(e) => update('end_date', e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="form-label">
              <MapPin size={12} className="inline mr-1" />
              Veranstaltungsort
            </label>
            <div className="space-y-2">
              <input
                type="text"
                value={form.location_name}
                onChange={(e) => update('location_name', e.target.value)}
                placeholder="Name des Ortes (z.B. Stadtbibliothek Leipzig)"
                className="form-input"
              />
              <input
                type="text"
                value={form.location_address}
                onChange={(e) => update('location_address', e.target.value)}
                placeholder="Adresse (z.B. Karl-Marx-Platz 1, 04109 Leipzig)"
                className="form-input"
              />
            </div>
          </div>

          {/* Region */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Bundesland</label>
              <select
                value={form.bundesland}
                onChange={(e) => update('bundesland', e.target.value)}
                className="form-input"
              >
                <option value="">Bundesland wählen</option>
                {BUNDESLAENDER.map((bl) => (
                  <option key={bl.id} value={bl.name}>{bl.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Kreis / Bezirk</label>
              <input
                type="text"
                value={form.kreis}
                onChange={(e) => update('kreis', e.target.value)}
                placeholder="z.B. Leipzig (Stadt)"
                className="form-input"
              />
            </div>
          </div>

          {/* Organizer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Organisator:in / Organisation</label>
              <input
                type="text"
                value={form.organizer_name}
                onChange={(e) => update('organizer_name', e.target.value)}
                placeholder="Name oder Vereinsname"
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Kontakt (E-Mail oder Telefon)</label>
              <input
                type="text"
                value={form.contact_info}
                onChange={(e) => update('contact_info', e.target.value)}
                placeholder="info@beispiel.de"
                className="form-input"
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="form-label">Webseite (optional)</label>
            <input
              type="url"
              value={form.website_url}
              onChange={(e) => update('website_url', e.target.value)}
              placeholder="https://..."
              className="form-input"
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="form-label">
              <Upload size={12} className="inline mr-1" />
              Event-Bild (max. 5 MB)
            </label>
            <label className="block cursor-pointer">
              <div
                className="rounded-xl p-4 text-center transition-all hover:border-blue-500"
                style={{
                  border: '2px dashed #2d3748',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imagePreview} alt="Vorschau" className="max-h-40 mx-auto rounded-lg object-contain" />
                ) : (
                  <div>
                    <Upload size={24} className="mx-auto mb-2 text-gray-600" />
                    <p className="text-sm" style={{ color: '#4a5568' }}>
                      Klicken um ein Bild hochzuladen
                    </p>
                    <p className="text-xs mt-1" style={{ color: '#374151' }}>
                      JPG, PNG, WebP – max. 5 MB
                    </p>
                  </div>
                )}
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>

          {/* Helpers (MachBar only) */}
          {form.type === 'machbar' && (
            <div
              className="p-4 rounded-xl space-y-3"
              style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}
            >
              <p className="text-sm font-semibold" style={{ color: '#fb923c' }}>
                👥 MachBar-Details
              </p>
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => update('helpers_needed', !form.helpers_needed)}
                  className="relative w-8 h-4 rounded-full transition-colors"
                  style={{ background: form.helpers_needed ? '#f97316' : '#374151' }}
                >
                  <div
                    className="absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform shadow"
                    style={{ transform: form.helpers_needed ? 'translateX(17px)' : 'translateX(2px)' }}
                  />
                </div>
                <span className="text-sm text-white">Helfer:innen gesucht</span>
              </label>
              {form.helpers_needed && (
                <div>
                  <label className="form-label">Was wird benötigt?</label>
                  <textarea
                    value={form.helpers_description}
                    onChange={(e) => update('helpers_description', e.target.value)}
                    placeholder="Beschreibe was du benötigst (Material, Personen, Fähigkeiten…)"
                    className="form-input"
                    rows={3}
                  />
                </div>
              )}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all"
            style={{
              background: loading ? '#374151' : 'linear-gradient(135deg, #7c3aed, #3b82f6)',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Wird gespeichert…' : 'Event einreichen'}
          </button>

          <p className="text-xs text-center" style={{ color: '#4a5568' }}>
            Events werden nach einer kurzen Prüfung durch das Bündnis OST-Team freigeschaltet.
          </p>
        </form>
      </div>
    </div>
  )
}
