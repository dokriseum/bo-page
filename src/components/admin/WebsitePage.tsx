'use client'

import { useState } from 'react'
import {
  ExternalLink,
  Eye,
  Save,
  Type,
  Image,
  Layout,
  Palette,
} from 'lucide-react'

const pages = [
  { id: 'home', label: 'Startseite', path: '/', status: 'aktiv', lastEdit: 'Vor 2 Tagen' },
  { id: 'events', label: 'Events', path: '/events', status: 'aktiv', lastEdit: 'Vor 1 Tag' },
  { id: 'stories', label: 'Geschichten', path: '/geschichten', status: 'aktiv', lastEdit: 'Vor 3 Tagen' },
  { id: 'network', label: 'Netzwerk', path: '/netzwerk', status: 'aktiv', lastEdit: 'Vor 1 Woche' },
  { id: 'about', label: 'Über uns', path: '/ueber-uns', status: 'aktiv', lastEdit: 'Vor 5 Tagen' },
  { id: 'imprint', label: 'Impressum', path: '/impressum', status: 'aktiv', lastEdit: 'Vor 1 Monat' },
  { id: 'privacy', label: 'Datenschutz', path: '/datenschutz', status: 'aktiv', lastEdit: 'Vor 1 Monat' },
]

export function WebsitePage() {
  const [selectedPage, setSelectedPage] = useState('home')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-medium text-foreground">Website verwalten</h1>
          <p className="text-[14px] text-muted-foreground mt-1">Seiteninhalte und Einstellungen</p>
        </div>
        <a href="/" target="_blank" className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium">
          <ExternalLink className="w-4 h-4" />
          Website öffnen
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-xl border border-border p-4">
          <h3 className="text-foreground font-medium mb-3">Seiten</h3>
          <div className="space-y-1">
            {pages.map(page => (
              <button
                key={page.id}
                onClick={() => setSelectedPage(page.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  selectedPage === page.id ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <Layout className="w-4 h-4 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] truncate">{page.label}</p>
                  <p className="text-[11px] opacity-60">{page.path}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground font-medium">
                {pages.find(p => p.id === selectedPage)?.label} bearbeiten
              </h3>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-2 px-3 py-2 bg-secondary text-foreground rounded-lg text-[13px] hover:bg-secondary/80 transition-colors font-medium">
                  <Eye className="w-4 h-4" /> Vorschau
                </button>
                <button className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-[13px] hover:bg-primary/90 transition-colors font-medium">
                  <Save className="w-4 h-4" /> Speichern
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[13px] text-muted-foreground block mb-1.5">Seitentitel</label>
                <input
                  type="text"
                  defaultValue={pages.find(p => p.id === selectedPage)?.label}
                  className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="text-[13px] text-muted-foreground block mb-1.5">Meta-Beschreibung</label>
                <textarea
                  rows={3}
                  defaultValue="Bündnis OST - Ostsicht schärfen, Netzwerke stärken. Gemeinsam für die Demokratie."
                  className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>
              <div>
                <label className="text-[13px] text-muted-foreground block mb-1.5">Inhalt</label>
                <div className="bg-secondary border border-border rounded-lg overflow-hidden">
                  <div className="flex items-center gap-1 p-2 border-b border-border">
                    <button className="p-1.5 rounded hover:bg-background/30 text-muted-foreground"><Type className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded hover:bg-background/30 text-muted-foreground"><Image className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded hover:bg-background/30 text-muted-foreground"><Palette className="w-4 h-4" /></button>
                  </div>
                  <textarea
                    rows={8}
                    defaultValue={
                      selectedPage === 'home'
                        ? 'Willkommen zur EventPlattform\n\nEntdecke spannende Events in deiner Nähe oder erstelle dein eigenes Event.\n\nOstsicht schärfen. Netzwerke stärken.'
                        : selectedPage === 'about'
                        ? 'Über uns: Bündnis Ost\n\nBündnisgrüne Wurzeln. Gemeinsam für die Demokratie.\n\nBündnis Ost ist aus der Überzeugung gewachsen, dass wir dem Osten eine starke, unüberhörbare Stimme geben müssen.'
                        : `Inhalt der Seite "${pages.find(p => p.id === selectedPage)?.label}"`
                    }
                    className="w-full px-4 py-3 bg-transparent text-foreground focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="text-foreground font-medium mb-4">SEO-Einstellungen</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[13px] text-muted-foreground block mb-1.5">URL-Pfad</label>
                <input
                  type="text"
                  defaultValue={pages.find(p => p.id === selectedPage)?.path}
                  className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="text-[13px] text-muted-foreground block mb-1.5">Letzte Bearbeitung</label>
                <input
                  type="text"
                  value={pages.find(p => p.id === selectedPage)?.lastEdit}
                  readOnly
                  className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-lg text-muted-foreground cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
