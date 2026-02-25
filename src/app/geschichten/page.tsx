import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Volume2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import StoryCard from '@/components/stories/StoryCard'
import type { Story } from '@/lib/types'

export const metadata = {
  title: 'Geschichten | Bündnis OST',
  description:
    'Persönliche Geschichten von Menschen aus den neuen Bundesländern. Vielfalt der Erfahrungen nach 1989.',
}

export const revalidate = 600

async function getStories(): Promise<Story[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('stories')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
  return data ?? []
}

export default async function GeschichtenPage() {
  const stories = await getStories()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero */}
      <div
        className="rounded-xl p-6 mb-8"
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #1e3a5f 100%)',
          border: '1px solid rgba(99,102,241,0.3)',
        }}
      >
        <p className="section-label">GESCHICHTEN</p>
        <h1 className="text-3xl font-bold text-white mb-2">Aus dem Osten</h1>
        <p className="text-sm" style={{ color: '#a5b4fc' }}>
          Persönliche Geschichten von Menschen aus den neuen Bundesländern.
        </p>
      </div>

      {/* Featured audio story */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-white mb-4">Aktuelles</h2>
        <div
          className="rounded-xl p-5 flex flex-col sm:flex-row gap-4"
          style={{ background: '#161b27', border: '1px solid #2d3748' }}
        >
          <div className="relative flex-shrink-0 w-full sm:w-32 h-32 rounded-xl overflow-hidden">
            <Image
              src="/media/ISK-Th-Landtag.jpeg"
              alt="Ilko-Sascha Kowalczuk"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white mb-2">
              Ilko-Sascha Kowalczuk – Festrede zum 35-jährigen Bestehen des Thüringer Landtags
            </h3>
            <p className="text-xs mb-3" style={{ color: '#8892a4' }}>
              Aufzeichnung der Rede des Historikers und Publizisten Dr. Ilko-Sascha Kowalczuk vom 25. Oktober 2025
              beim Festakt zum 35-jährigen Bestehen des Thüringer Landtags.{' '}
              <a
                href="https://www.thueringer-landtag.de/presse/pressemitteilungen/2025/tag-der-verfassung-und-des-thueringer-landtags/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#818cf8' }}
                className="hover:underline"
              >
                (Quelle: Landtag Thüringen)
              </a>
            </p>
            <div className="flex items-center gap-2 mb-2">
              <Volume2 size={14} style={{ color: '#60a5fa' }} />
              <span className="text-xs font-medium" style={{ color: '#60a5fa' }}>AUDIO</span>
            </div>
            <audio controls className="w-full max-w-lg" style={{ accentColor: '#3b82f6' }}>
              <source src="/media/ISK-Rede-Landtag-Thueringen-251025.mp4" type="audio/mpeg" />
              Dein Browser unterstützt keine Audio-Wiedergabe.
            </audio>
          </div>
        </div>
      </section>

      {/* Stories grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Geschichten</h2>
            <p className="text-sm mt-0.5" style={{ color: '#8892a4' }}>
              Hier sammeln wir persönliche Geschichten von Menschen aus den neuen Bundesländern.
            </p>
          </div>
          <span className="text-sm" style={{ color: '#4a5568' }}>
            {stories.length} {stories.length === 1 ? 'Geschichte' : 'Geschichten'}
          </span>
        </div>

        {stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stories.map((story, i) => (
              <StoryCard key={story.id} story={story} animationIndex={i} />
            ))}
          </div>
        ) : (
          <div
            className="rounded-xl p-12 text-center"
            style={{ background: '#161b27', border: '1px solid #2d3748' }}
          >
            <p className="text-sm" style={{ color: '#8892a4' }}>
              Noch keine Geschichten vorhanden.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
