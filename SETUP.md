# 🚀 Setup-Anleitung: Bündnis OST – Next.js + Supabase

Diese Anleitung beschreibt Schritt für Schritt, wie du die neue Bündnis OST Webanwendung
einrichtest und in Produktion bringst.

---

## 📋 Inhaltsverzeichnis

1. [Voraussetzungen](#1-voraussetzungen)
2. [Lokale Entwicklung starten](#2-lokale-entwicklung-starten)
3. [Supabase einrichten](#3-supabase-einrichten)
4. [Datenbank-Schema anlegen](#4-datenbank-schema-anlegen)
5. [Storage Buckets konfigurieren](#5-storage-buckets-konfigurieren)
6. [E-Mail-Templates anpassen](#6-e-mail-templates-anpassen)
7. [Umgebungsvariablen setzen](#7-umgebungsvariablen-setzen)
8. [Deployment auf Vercel](#8-deployment-auf-vercel)
9. [Inhalte befüllen (Erstdaten)](#9-inhalte-befüllen-erstdaten)
10. [Domain konfigurieren](#10-domain-konfigurieren)
11. [Checkliste vor Go-Live](#11-checkliste-vor-go-live)

---

## 1. Voraussetzungen

- **Node.js** ≥ 20 (empfohlen: aktuellste LTS)
  ```bash
  node --version  # sollte v20.x.x oder höher zeigen
  ```
- **npm** ≥ 10 (kommt mit Node.js)
- **Git** installiert
- **Supabase-Account** → https://supabase.com (kostenlos)
- **Vercel-Account** → https://vercel.com (kostenlos für Hobby-Projekte)

---

## 2. Lokale Entwicklung starten

### 2.1 Repository klonen / Abhängigkeiten installieren

```bash
# Im Projektordner (wo package.json liegt)
npm install
```

### 2.2 Umgebungsvariablen anlegen

```bash
cp .env.example .env.local
```

Dann `.env.local` mit deinen Supabase-Daten befüllen (siehe Schritt 3 & 7).

### 2.3 Entwicklungsserver starten

```bash
npm run dev
```

Die App läuft dann auf **http://localhost:3000**

---

## 3. Supabase einrichten

### 3.1 Projekt erstellen

1. Gehe zu **https://supabase.com** → „New Project"
2. Wähle eine **Organisation** (oder erstelle eine neue)
3. Gib dem Projekt einen Namen: z.B. `buendnis-ost`
4. Wähle die **Region**: `Frankfurt (eu-central-1)` (am nächsten für Deutschland)
5. Setze ein **Datenbankpasswort** und speichere es sicher
6. Klicke „Create new project" → warten bis es bereit ist (~2 Minuten)

### 3.2 API Keys kopieren

1. Im Supabase-Dashboard: **Settings** → **API**
2. Notiere dir:
   - **Project URL**: `https://xyzabcdef.supabase.co`
   - **anon (public) key**: Langer JWT-Token unter „Project API keys"
   - **service_role key**: NUR für Server-seitigen Zugriff – niemals im Browser!

---

## 4. Datenbank-Schema anlegen

Gehe in Supabase zu **SQL Editor** → „New query" und führe folgende Befehle aus:

### 4.1 Tabellen erstellen

```sql
-- ============================================================
-- PROFILES (Nutzerprofile, automatisch bei Registrierung)
-- ============================================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT,
  avatar_url TEXT,
  organization TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Automatisch Profil anlegen wenn sich jemand registriert
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ============================================================
-- EVENTS
-- ============================================================
CREATE TABLE public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'standard'
    CHECK (type IN ('standard', 'machbar')),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  location_name TEXT,
  location_address TEXT,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  bundesland TEXT,
  kreis TEXT,
  image_url TEXT,
  organizer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  organizer_name TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  helpers_needed BOOLEAN DEFAULT FALSE,
  helpers_description TEXT,
  contact_info TEXT,
  website_url TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Automatisch updated_at setzen
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at();

-- Volltextsuche-Index
CREATE INDEX events_search_idx ON public.events
  USING gin(to_tsvector('german', coalesce(title,'') || ' ' || coalesce(description,'') || ' ' || coalesce(location_name,'')));

-- Datum-Index
CREATE INDEX events_start_date_idx ON public.events (start_date);

-- ============================================================
-- STORIES
-- ============================================================
CREATE TABLE public.stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  author_name TEXT NOT NULL,
  excerpt TEXT,
  full_text TEXT NOT NULL,
  image_url TEXT,
  audio_url TEXT,
  video_url TEXT,
  location TEXT,
  age INTEGER,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER stories_updated_at
  BEFORE UPDATE ON public.stories
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at();

-- ============================================================
-- ORGANIZATIONS (Netzwerk)
-- ============================================================
CREATE TABLE public.organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  website_url TEXT,
  contact_email TEXT,
  contact_name TEXT,
  image_url TEXT,
  bundesland TEXT,
  city TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.2 Row Level Security (RLS) aktivieren

```sql
-- ============================================================
-- RLS aktivieren
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- PROFILES
CREATE POLICY "Nutzer sieht eigenes Profil"
  ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Nutzer aktualisiert eigenes Profil"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- EVENTS: Alle können verifizierte Events lesen
CREATE POLICY "Jeder kann Events lesen"
  ON public.events FOR SELECT USING (true);
-- Eingeloggte können Events erstellen
CREATE POLICY "Eingeloggte können Events erstellen"
  ON public.events FOR INSERT WITH CHECK (auth.role() = 'authenticated');
-- Nur Ersteller oder Admin kann bearbeiten
CREATE POLICY "Ersteller kann eigenes Event bearbeiten"
  ON public.events FOR UPDATE USING (auth.uid() = organizer_id);

-- STORIES: Nur veröffentlichte sehen alle
CREATE POLICY "Jeder sieht veröffentlichte Geschichten"
  ON public.stories FOR SELECT USING (is_published = true);
-- Eingeloggte können Geschichten einreichen
CREATE POLICY "Eingeloggte können Geschichten einreichen"
  ON public.stories FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ORGANIZATIONS: Alle können lesen
CREATE POLICY "Jeder kann Organisationen lesen"
  ON public.organizations FOR SELECT USING (true);
```

### 4.3 Admin-Policy (optional, für dich als Betreiber)

```sql
-- Erstelle eine admin_users Tabelle oder nutze Supabase Auth Custom Claims
-- Einfachste Lösung: Service Role Key für Admin-Operationen nutzen

-- Oder: Eine Rolle 'admin' definieren
-- In Supabase Dashboard → Authentication → Users
-- Dann deinen User ausfindig machen und als "superadmin" markieren
-- (Nutze dafür User Metadata in Supabase)
```

---

## 5. Storage Buckets konfigurieren

Gehe in Supabase zu **Storage** und erstelle folgende Buckets:

### 5.1 Bucket für Event-Bilder

1. Klicke „New bucket"
2. Name: `event-images`
3. **Public**: ✅ aktiviert (Bilder sollen öffentlich zugänglich sein)
4. Klicke „Save"

### 5.2 Bucket für Story-Bilder

1. Name: `story-images`
2. **Public**: ✅ aktiviert
3. Klicke „Save"

### 5.3 Bucket für Avatare

1. Name: `avatars`
2. **Public**: ✅ aktiviert
3. Klicke „Save"

### 5.4 Storage Policies setzen

Im SQL Editor ausführen:

```sql
-- Event-Bilder: Jeder kann lesen, Eingeloggte können hochladen
INSERT INTO storage.buckets (id, name, public) VALUES ('event-images', 'event-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('story-images', 'story-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

CREATE POLICY "Event-Bilder öffentlich lesbar"
  ON storage.objects FOR SELECT USING (bucket_id = 'event-images');

CREATE POLICY "Eingeloggte können Event-Bilder hochladen"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'event-images' AND auth.role() = 'authenticated');

CREATE POLICY "Story-Bilder öffentlich lesbar"
  ON storage.objects FOR SELECT USING (bucket_id = 'story-images');

CREATE POLICY "Eingeloggte können Story-Bilder hochladen"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'story-images' AND auth.role() = 'authenticated');

CREATE POLICY "Avatare öffentlich lesbar"
  ON storage.objects FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Nutzer kann eigenen Avatar hochladen"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
```

---

## 6. E-Mail-Templates anpassen

1. Gehe zu **Authentication** → **Email Templates**

### Magic Link / OTP Template:

Ändere das „Magic Link"-Template auf Deutsch:

**Betreff:** `Dein Anmelde-Link für Bündnis OST`

**Body:**
```html
<h2>Willkommen bei Bündnis OST!</h2>
<p>Klicke auf den Link, um dich anzumelden:</p>
<p><a href="{{ .ConfirmationURL }}">Jetzt anmelden →</a></p>
<p>Der Link ist 1 Stunde gültig und kann nur einmal verwendet werden.</p>
<p>Wenn du diese E-Mail nicht angefordert hast, ignoriere sie bitte.</p>
<br>
<p>Bündnis OST – Ostsicht schärfen, Netzwerke stärken.</p>
```

2. Stelle die **Site URL** ein:
   - Gehe zu **Authentication** → **URL Configuration**
   - **Site URL**: `https://buendnisost.de` (oder deine Produktions-URL)
   - **Redirect URLs**: Füge hinzu:
     - `http://localhost:3000/**`
     - `https://buendnisost.de/**`
     - `https://*.vercel.app/**` (für Preview-Deployments)

---

## 7. Umgebungsvariablen setzen

### Lokal (`.env.local`)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://DEIN_PROJEKT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dein_anon_key
SUPABASE_SERVICE_ROLE_KEY=dein_service_role_key

# App URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Wie bekomme ich diese Werte?

1. Supabase Dashboard → **Settings** → **API**
2. **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
3. Unter „Project API keys":
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` (**Niemals veröffentlichen!**)

---

## 8. Deployment auf Vercel

### 8.1 Repository auf GitHub pushen

```bash
# Im Projektordner
git add .
git commit -m "feat: Next.js + Supabase rewrite"
git push origin main
```

### 8.2 Vercel-Projekt anlegen

1. Gehe zu **https://vercel.com** → „New Project"
2. Importiere dein GitHub-Repository
3. **Framework Preset**: Next.js (wird automatisch erkannt)
4. Klicke auf „Environment Variables" und füge ein:

| Name | Wert |
|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://DEIN_PROJEKT.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | dein anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | dein service_role key |
| `NEXT_PUBLIC_SITE_URL` | `https://buendnisost.de` |

5. Klicke „Deploy"

### 8.3 Automatische Deployments

Nach dem ersten Deployment wird jeder Push auf `main` automatisch deployed.

---

## 9. Inhalte befüllen (Erstdaten)

### Events importieren (bisherige Daten)

Die bestehenden Events aus `static/events.json` kannst du über den Supabase Table Editor importieren:

1. Gehe zu **Table Editor** → Tabelle `events`
2. Klicke auf „Import data from CSV/JSON"
3. Oder nutze die Supabase API:

```javascript
// Script zum Importieren (einmalig ausführen)
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

const supabase = createClient(
  'https://DEIN_PROJEKT.supabase.co',
  'DEIN_SERVICE_ROLE_KEY'
)

const events = JSON.parse(fs.readFileSync('static/events.json', 'utf8'))

async function importEvents() {
  for (const event of events) {
    await supabase.from('events').insert({
      title: event.title,
      description: event.description,
      type: event.helpers_needed ? 'machbar' : 'standard',
      start_date: event.start_date,
      end_date: event.end_date,
      location_name: event.location,
      bundesland: event.category,
      organizer_name: event.organizer,
      contact_info: event.contact,
      is_verified: true,
      helpers_needed: event.helpers_needed ?? false,
    })
  }
  console.log('Import abgeschlossen!')
}

importEvents()
```

### Stories importieren

Die bisherigen Geschichten aus `data/stories.yaml` kannst du ebenfalls importieren:

```sql
-- Beispiel-Story direkt in Supabase einfügen:
INSERT INTO public.stories (author_name, excerpt, full_text, is_published)
VALUES (
  'Katja',
  'In der DDR geboren, meine Eltern mussten sich komplett neu orientieren...',
  'Vollständiger Text hier...',
  true
);
```

---

## 10. Domain konfigurieren

### Vercel-Domain einrichten

1. Im Vercel-Dashboard: **Settings** → **Domains**
2. Füge `buendnisost.de` hinzu
3. Folge den DNS-Anweisungen (CNAME oder A-Record bei deinem Domain-Anbieter)

### Supabase-Domain updaten

1. Gehe zu **Supabase** → **Authentication** → **URL Configuration**
2. Ändere **Site URL** zu `https://buendnisost.de`
3. Füge zu **Redirect URLs** hinzu: `https://buendnisost.de/**`

---

## 11. Checkliste vor Go-Live

- [ ] Supabase-Projekt erstellt (Region: Frankfurt)
- [ ] Datenbank-Schema vollständig angelegt (alle 4 Tabellen)
- [ ] RLS-Policies aktiviert
- [ ] Storage Buckets erstellt (event-images, story-images, avatars)
- [ ] E-Mail-Template auf Deutsch angepasst
- [ ] Site URL in Supabase auf Produktions-URL gesetzt
- [ ] `.env.local` ausgefüllt und lokal getestet
- [ ] `npm run dev` läuft ohne Fehler
- [ ] `npm run build` läuft ohne Fehler
- [ ] Auf Vercel deployed
- [ ] Umgebungsvariablen in Vercel gesetzt
- [ ] Produktions-Domain konfiguriert
- [ ] Erste Events und Geschichten importiert
- [ ] Login-Flow getestet (Magic Link erhalten?)
- [ ] Event erstellen getestet
- [ ] Bilder hochladen getestet
- [ ] Impressum + Datenschutz ausgefüllt

---

## 🛠️ Häufige Fehler & Lösungen

### "supabaseUrl is required"
→ `.env.local` fehlt oder falsch befüllt. Überprüfe ob die Datei existiert.

### Login-E-Mail kommt nicht an
→ Supabase limitiert kostenlos auf 3 E-Mails/Stunde. Für Produktion:
Supabase Dashboard → **Settings** → **Auth** → eigenen SMTP-Server konfigurieren.

### Bilder werden nicht angezeigt
→ Storage Bucket muss auf „Public" stehen. Überprüfe Bucket-Einstellungen.

### "permission denied for table events"
→ RLS-Policies nicht korrekt gesetzt. Überprüfe Schritt 4.2.

### Build-Fehler "Cannot find module 'leaflet'"
→ `npm install` erneut ausführen.

---

## 📞 Support

Bei Fragen: **events@buendnisost.de**

Technische Dokumentation:
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
