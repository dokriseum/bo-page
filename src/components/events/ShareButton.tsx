'use client'

import { Share2 } from 'lucide-react'

export default function ShareButton() {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(window.location.href)}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:bg-white/5"
      style={{ color: '#8892a4', borderColor: '#2d3748' }}
    >
      <Share2 size={12} />
      Link
    </button>
  )
}
