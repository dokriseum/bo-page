import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, ArrowRight, Volume2 } from 'lucide-react'
import type { Story } from '@/lib/types'
import { truncateText } from '@/lib/utils'

interface StoryCardProps {
  story: Story
  variant?: 'horizontal' | 'vertical'
  animationIndex?: number
}

export default function StoryCard({
  story,
  variant = 'horizontal',
  animationIndex = 0,
}: StoryCardProps) {
  if (variant === 'vertical') {
    return (
      <Link
        href={`/geschichten/${story.id}`}
        className={`story-card flex-col animate-fade-in-up stagger-${Math.min(animationIndex + 1, 8)}`}
        style={{ textDecoration: 'none' }}
      >
        {/* Image */}
        <div className="relative w-full overflow-hidden rounded-t-xl" style={{ height: '160px' }}>
          {story.image_url ? (
            <Image src={story.image_url} alt={story.author_name} fill className="object-cover" sizes="300px" />
          ) : (
            <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, #4c1d95, #7c3aed)' }}>
              <div className="w-full h-full flex items-center justify-center">
                <BookOpen size={32} className="text-white/50" />
              </div>
            </div>
          )}
          <span
            className="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-widest"
            style={{ background: 'rgba(124,58,237,0.8)', color: 'white', fontSize: '0.6rem' }}
          >
            GESCHICHTEN
          </span>
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col gap-2 flex-1">
          <h3 className="font-semibold text-sm text-white">{story.author_name}</h3>
          {story.excerpt && (
            <p className="text-xs leading-relaxed line-clamp-3" style={{ color: '#8892a4' }}>
              {truncateText(story.excerpt, 120)}
            </p>
          )}
          <div className="mt-auto flex items-center justify-between">
            {story.audio_url && (
              <span className="flex items-center gap-1 text-xs" style={{ color: '#8892a4' }}>
                <Volume2 size={11} />
                AUDIO
              </span>
            )}
            <span className="btn-weiterlesen ml-auto">
              WEITERLESEN <ArrowRight size={11} />
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/geschichten/${story.id}`}
      className={`story-card animate-fade-in-up stagger-${Math.min(animationIndex + 1, 8)}`}
      style={{ textDecoration: 'none' }}
    >
      {/* Image */}
      <div className="story-image relative flex-shrink-0">
        {story.image_url ? (
          <Image src={story.image_url} alt={story.author_name} fill className="object-cover" sizes="80px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen size={24} className="text-white/40" />
          </div>
        )}
        <span
          className="absolute top-1.5 left-1 text-white rounded px-1"
          style={{
            background: 'rgba(124,58,237,0.9)',
            fontSize: '0.55rem',
            fontWeight: 700,
            letterSpacing: '0.5px',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
            padding: '4px 2px',
          }}
        >
          GESCH.
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
        <div>
          <h3 className="font-semibold text-sm text-white mb-1">{story.author_name}</h3>
          {story.excerpt && (
            <p className="text-xs leading-relaxed line-clamp-2" style={{ color: '#8892a4' }}>
              {truncateText(story.excerpt, 100)}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between mt-2">
          {story.audio_url && (
            <span className="flex items-center gap-1 text-xs" style={{ color: '#8892a4' }}>
              <Volume2 size={11} />
              AUDIO
            </span>
          )}
          <span className="btn-weiterlesen ml-auto">
            WEITERLESEN <ArrowRight size={11} />
          </span>
        </div>
      </div>
    </Link>
  )
}
