import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Volume2, MapPin, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Story } from '@/lib/types'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: story } = await supabase
    .from('stories')
    .select('author_name, excerpt')
    .eq('id', id)
    .single()
  if (!story) return { title: 'Geschichte nicht gefunden' }
  return {
    title: `${story.author_name} | Geschichten – Bündnis OST`,
    description: story.excerpt ?? undefined,
  }
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: story } = await supabase
    .from('stories')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .single<Story>()

  if (!story) notFound()

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/geschichten"
        className="inline-flex items-center gap-1.5 text-sm mb-6 hover:text-blue-300 transition-colors"
        style={{ color: '#8892a4' }}
      >
        <ArrowLeft size={14} />
        Alle Geschichten
      </Link>

      <div
        className="rounded-xl overflow-hidden"
        style={{ background: '#161b27', border: '1px solid #2d3748' }}
      >
        {/* Header image */}
        {story.image_url && (
          <div className="relative w-full overflow-hidden" style={{ height: '280px' }}>
            <Image
              src={story.image_url}
              alt={story.author_name}
              fill
              className="object-cover"
              sizes="700px"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, #161b27 100%)' }} />
          </div>
        )}

        <div className="p-6 md:p-8">
          {/* Category badge */}
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded mb-4"
            style={{ background: 'rgba(124,58,237,0.2)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }}
          >
            GESCHICHTEN
          </span>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-1.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(124,58,237,0.2)' }}
              >
                <User size={14} style={{ color: '#a78bfa' }} />
              </div>
              <span className="font-semibold text-white">{story.author_name}</span>
            </div>

            {story.location && story.location !== '--' && (
              <div className="flex items-center gap-1 text-sm" style={{ color: '#8892a4' }}>
                <MapPin size={12} />
                {story.location}
              </div>
            )}

            {story.age && (
              <span className="text-sm" style={{ color: '#8892a4' }}>
                {story.age} Jahre
              </span>
            )}
          </div>

          {/* Audio */}
          {story.audio_url && (
            <div className="mb-6 p-4 rounded-xl" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Volume2 size={14} style={{ color: '#60a5fa' }} />
                <span className="text-xs font-medium uppercase tracking-widest" style={{ color: '#60a5fa' }}>Audio</span>
              </div>
              <audio controls className="w-full" style={{ accentColor: '#3b82f6' }}>
                <source src={story.audio_url} type="audio/mpeg" />
                Dein Browser unterstützt keine Audio-Wiedergabe.
              </audio>
            </div>
          )}

          {/* Full text */}
          <div
            className="text-sm leading-relaxed whitespace-pre-line"
            style={{ color: '#c4cad6' }}
          >
            {story.full_text}
          </div>
        </div>
      </div>

      {/* Back nav */}
      <div className="mt-8 text-center">
        <Link
          href="/geschichten"
          className="inline-flex items-center gap-1.5 text-sm hover:text-blue-300 transition-colors"
          style={{ color: '#60a5fa' }}
        >
          <ArrowLeft size={14} />
          Weitere Geschichten lesen
        </Link>
      </div>
    </div>
  )
}
