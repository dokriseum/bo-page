'use client'

import { useState } from 'react'
import {
  Save,
  Globe,
  Mail,
  Shield,
  Bell,
  Palette,
  Database,
  ShieldCheck,
  Info,
} from 'lucide-react'
import { useModeration } from './ModerationContext'

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
        enabled ? 'bg-primary' : 'bg-switch-background'
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
          enabled ? 'left-[22px]' : 'left-0.5'
        }`}
      />
    </button>
  )
}

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general')
  const { settings, toggleEventModeration, toggleStoryModeration } = useModeration()

  const [securityToggles, setSecurityToggles] = useState({
    twoFactor: true,
    registration: true,
    emailVerification: true,
  })
  const [notifToggles, setNotifToggles] = useState({
    newEvents: true,
    newStories: true,
    newUsers: false,
    comments: true,
    system: true,
  })

  const sections = [
    { id: 'general', label: 'Allgemein', icon: Globe },
    { id: 'moderation', label: 'Moderation', icon: ShieldCheck },
    { id: 'email', label: 'E-Mail', icon: Mail },
    { id: 'security', label: 'Sicherheit', icon: Shield },
    { id: 'notifications', label: 'Benachrichtigungen', icon: Bell },
    { id: 'appearance', label: 'Erscheinungsbild', icon: Palette },
    { id: 'data', label: 'Daten', icon: Database },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-medium text-foreground">Einstellungen</h1>
        <p className="text-[14px] text-muted-foreground mt-1">Plattform-Konfiguration verwalten</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="space-y-1">
            {sections.map((s) => {
              const Icon = s.icon
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    activeSection === s.id
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="text-[14px]">{s.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          {activeSection === 'general' && (
            <div className="bg-card rounded-xl border border-border p-5 space-y-5">
              <h3 className="text-foreground font-medium">Allgemeine Einstellungen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] text-muted-foreground block mb-1.5">Plattform-Name</label>
                  <input type="text" defaultValue="Bündnis OST" className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="text-[13px] text-muted-foreground block mb-1.5">Untertitel</label>
                  <input type="text" defaultValue="Ostsicht schärfen, Netzwerke stärken." className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="text-[13px] text-muted-foreground block mb-1.5">Kontakt E-Mail</label>
                  <input type="email" defaultValue="events@buendnisost.de" className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="text-[13px] text-muted-foreground block mb-1.5">Website-URL</label>
                  <input type="url" defaultValue="https://buendnisost.de" className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>
              <div>
                <label className="text-[13px] text-muted-foreground block mb-1.5">Beschreibung</label>
                <textarea rows={3} defaultValue="Unsere Plattform vernetzt Initiativen, Vereine und Engagierte mit passenden Events in ihrer Region." className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              </div>
              <div className="flex justify-end">
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  <Save className="w-4 h-4" /> Speichern
                </button>
              </div>
            </div>
          )}

          {activeSection === 'moderation' && (
            <div className="space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[14px] text-foreground">Moderations-Einstellungen</p>
                    <p className="text-[13px] text-muted-foreground mt-1">Hier steuerst du, ob neue Beiträge automatisch veröffentlicht oder erst von einem Moderator geprüft und freigegeben werden müssen.</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-5 space-y-4">
                <h3 className="text-foreground font-medium">Event-Moderation</h3>
                <div className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${settings.eventModerationEnabled ? 'bg-primary/5 border-primary/30' : 'bg-secondary/50 border-border'}`}>
                  <div>
                    <p className="text-[14px] text-foreground">Vorab-Freigabe für Events aktivieren</p>
                    <p className="text-[13px] text-muted-foreground mt-0.5">{settings.eventModerationEnabled ? 'Neue Events müssen von einem Moderator freigegeben werden.' : 'Neue Events werden sofort veröffentlicht.'}</p>
                  </div>
                  <Toggle enabled={settings.eventModerationEnabled} onToggle={toggleEventModeration} />
                </div>
                {!settings.eventModerationEnabled && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-[13px] text-amber-300">Achtung: Events werden ohne Prüfung veröffentlicht.</p>
                  </div>
                )}
              </div>

              <div className="bg-card rounded-xl border border-border p-5 space-y-4">
                <h3 className="text-foreground font-medium">Geschichten-Moderation</h3>
                <div className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${settings.storyModerationEnabled ? 'bg-primary/5 border-primary/30' : 'bg-secondary/50 border-border'}`}>
                  <div>
                    <p className="text-[14px] text-foreground">Vorab-Freigabe für Geschichten aktivieren</p>
                    <p className="text-[13px] text-muted-foreground mt-0.5">{settings.storyModerationEnabled ? 'Geschichten müssen freigegeben werden.' : 'Geschichten werden sofort veröffentlicht.'}</p>
                  </div>
                  <Toggle enabled={settings.storyModerationEnabled} onToggle={toggleStoryModeration} />
                </div>
                {!settings.storyModerationEnabled && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-[13px] text-amber-300">Achtung: Geschichten werden ohne Prüfung veröffentlicht.</p>
                  </div>
                )}
              </div>

              <div className="bg-card rounded-xl border border-border p-5 space-y-4">
                <h3 className="text-foreground font-medium">Moderations-Richtlinien</h3>
                <textarea rows={6} defaultValue={`1. Keine diskriminierenden oder hasserfüllten Inhalte\n2. Keine Werbung oder Spam\n3. Keine personenbezogenen Daten Dritter ohne Einwilligung\n4. Inhaltlicher Bezug zur Plattform\n5. Respektvoller und konstruktiver Umgangston\n6. Keine Urheberrechtsverletzungen`} className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none text-[14px]" />
                <div className="flex justify-end">
                  <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                    <Save className="w-4 h-4" /> Richtlinien speichern
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'email' && (
            <div className="bg-card rounded-xl border border-border p-5 space-y-5">
              <h3 className="text-foreground font-medium">E-Mail-Einstellungen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] text-muted-foreground block mb-1.5">SMTP Server</label>
                  <input type="text" defaultValue="smtp.buendnisost.de" className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="text-[13px] text-muted-foreground block mb-1.5">SMTP Port</label>
                  <input type="text" defaultValue="587" className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="text-[13px] text-muted-foreground block mb-1.5">Absender E-Mail</label>
                  <input type="email" defaultValue="noreply@buendnisost.de" className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="text-[13px] text-muted-foreground block mb-1.5">Absender Name</label>
                  <input type="text" defaultValue="Bündnis OST" className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>
              <div className="flex justify-end">
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  <Save className="w-4 h-4" /> Speichern
                </button>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="bg-card rounded-xl border border-border p-5 space-y-5">
              <h3 className="text-foreground font-medium">Sicherheitseinstellungen</h3>
              <div className="space-y-4">
                {[
                  { key: 'twoFactor' as const, label: 'Zwei-Faktor-Authentifizierung', desc: 'Erfordert 2FA für Admin-Konten' },
                  { key: 'registration' as const, label: 'Registrierung erlauben', desc: 'Neue Benutzer können sich selbst registrieren' },
                  { key: 'emailVerification' as const, label: 'E-Mail-Verifizierung', desc: 'Neue Benutzer müssen ihre E-Mail bestätigen' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="text-[14px] text-foreground">{item.label}</p>
                      <p className="text-[13px] text-muted-foreground">{item.desc}</p>
                    </div>
                    <Toggle enabled={securityToggles[item.key]} onToggle={() => setSecurityToggles((prev) => ({ ...prev, [item.key]: !prev[item.key] }))} />
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  <Save className="w-4 h-4" /> Speichern
                </button>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="bg-card rounded-xl border border-border p-5 space-y-5">
              <h3 className="text-foreground font-medium">Benachrichtigungs-Einstellungen</h3>
              <div className="space-y-4">
                {[
                  { key: 'newEvents' as const, label: 'Neue Event-Einreichungen', desc: 'Benachrichtigung bei neuen Event-Einreichungen' },
                  { key: 'newStories' as const, label: 'Neue Geschichten', desc: 'Benachrichtigung bei neuen Geschichten-Einreichungen' },
                  { key: 'newUsers' as const, label: 'Neue Registrierungen', desc: 'Benachrichtigung bei neuen Benutzer-Registrierungen' },
                  { key: 'comments' as const, label: 'Kommentare & Feedback', desc: 'Benachrichtigung bei neuen Kommentaren' },
                  { key: 'system' as const, label: 'System-Updates', desc: 'Benachrichtigung über System-Updates und Wartungen' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="text-[14px] text-foreground">{item.label}</p>
                      <p className="text-[13px] text-muted-foreground">{item.desc}</p>
                    </div>
                    <Toggle enabled={notifToggles[item.key]} onToggle={() => setNotifToggles((prev) => ({ ...prev, [item.key]: !prev[item.key] }))} />
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  <Save className="w-4 h-4" /> Speichern
                </button>
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="bg-card rounded-xl border border-border p-5 space-y-5">
              <h3 className="text-foreground font-medium">Erscheinungsbild</h3>
              <div>
                <label className="text-[13px] text-muted-foreground block mb-2">Primärfarbe</label>
                <div className="flex gap-3">
                  {['#3B82F6', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'].map((c) => (
                    <button key={c} className="w-10 h-10 rounded-lg border-2 border-transparent hover:border-white/30 transition-colors" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[13px] text-muted-foreground block mb-2">Header-Gradient</label>
                <div className="h-12 rounded-lg overflow-hidden">
                  <div className="w-full h-full" style={{ background: 'linear-gradient(90deg, #e74c3c 0%, #f39c12 14%, #f1c40f 28%, #27ae60 42%, #16a085 56%, #3498db 70%, #9b59b6 85%, #e91e63 100%)' }} />
                </div>
                <p className="text-[12px] text-muted-foreground mt-1">Der Bündnis OST Regenbogen-Gradient</p>
              </div>
              <div className="flex justify-end">
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  <Save className="w-4 h-4" /> Speichern
                </button>
              </div>
            </div>
          )}

          {activeSection === 'data' && (
            <div className="bg-card rounded-xl border border-border p-5 space-y-5">
              <h3 className="text-foreground font-medium">Daten & Export</h3>
              <div className="space-y-3">
                {[
                  { label: 'Events exportieren', desc: 'Alle Events als CSV-Datei herunterladen', btn: 'Exportieren' },
                  { label: 'Geschichten exportieren', desc: 'Alle Geschichten als JSON-Datei herunterladen', btn: 'Exportieren' },
                  { label: 'Benutzer exportieren', desc: 'Alle Benutzerdaten als CSV-Datei herunterladen', btn: 'Exportieren' },
                  { label: 'Datenbank-Backup', desc: 'Vollständiges Backup der Datenbank erstellen', btn: 'Backup erstellen' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="text-[14px] text-foreground">{item.label}</p>
                      <p className="text-[13px] text-muted-foreground">{item.desc}</p>
                    </div>
                    <button className="px-3 py-2 bg-secondary text-foreground rounded-lg text-[13px] hover:bg-secondary/80 transition-colors font-medium">{item.btn}</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
