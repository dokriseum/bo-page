'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface ModerationSettings {
  eventModerationEnabled: boolean
  storyModerationEnabled: boolean
}

interface ModerationContextType {
  settings: ModerationSettings
  toggleEventModeration: () => void
  toggleStoryModeration: () => void
}

const ModerationContext = createContext<ModerationContextType | null>(null)

export function ModerationProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ModerationSettings>({
    eventModerationEnabled: true,
    storyModerationEnabled: true,
  })

  const toggleEventModeration = () =>
    setSettings((prev) => ({
      ...prev,
      eventModerationEnabled: !prev.eventModerationEnabled,
    }))

  const toggleStoryModeration = () =>
    setSettings((prev) => ({
      ...prev,
      storyModerationEnabled: !prev.storyModerationEnabled,
    }))

  return (
    <ModerationContext.Provider
      value={{ settings, toggleEventModeration, toggleStoryModeration }}
    >
      {children}
    </ModerationContext.Provider>
  )
}

export function useModeration() {
  const ctx = useContext(ModerationContext)
  if (!ctx) throw new Error('useModeration must be used within ModerationProvider')
  return ctx
}
