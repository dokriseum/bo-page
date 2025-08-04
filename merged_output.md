## README.md

```md
# Bündnis Ost • Website

> Offizielle Projekt-Repo der Gliederung **Bündnis Ost**  
> Statische Site auf Basis von **[Hugo](https://gohugo.io/)** (⚡ ultraschnell, Go-basiert)

---

## 📑 Inhalt

1. [Projektüberblick](#projektüberblick)  
2. [Schnellstart](#schnellstart)  
3. [Installation von Hugo](#installation-von-hugo)  
   * [macOS](#macos) • [Ubuntu / Debian](#ubuntu--debian) • [Windows](#windows)  
4. [Entwicklungs-Workflow](#entwicklungs-workflow)  
5. [Struktur des Repos](#struktur-des-repos)  
6. [Deployment / Build](#deployment--build)  
7. [Lizenz & Mitwirken](#lizenz--mitwirken)

---

## Projektüberblick

|                     |                                                      |
| ------------------- | ---------------------------------------------------- |
| **Ziel**            | Politische Netzpräsenz für *Bündnis Ost*             |
| **Technik-Stack**   | Hugo (extended) · Markdown Content · SCSS/CSS Assets |
| **Design-Leitbild** | ???                                                  |

---

## Schnellstart

```bash
# 1 Repo klonen
git clone https://github.com/dokriseum/bo-page
cd website

# 2 Hugo extended installieren  (siehe unten für OS-spezifische Befehle)

# 3 Lokalen Dev-Server starten
hugo server

# 4 Browser öffnen
open http://localhost:1313     # macOS
# oder
xdg-open http://localhost:1313 # Linux
```

---

## Installation von Hugo

> **Wichtig:**  
> *Wir benötigen die **extended-Variante** von Hugo, weil sie den integrierten SCSS/SASS-Compiler enthält.*

### Ubuntu / Debian 💻🐧

| Variante | Befehl |
|----------|--------|
| **Snap (empfohlen)** | `doas snap install hugo --channel=extended` |
| **APT-Repo** | `echo "deb [trusted=yes] https://apt.gohugo.io/ /" | doas tee /etc/apt/sources.list.d/hugo.list` \n `doas apt update && doas apt install hugo` |
| **Manuell** | Aktuelle `.deb` oder `.tar.gz` von <https://github.com/gohugoio/hugo/releases> laden und mit `dpkg -i …` (bzw. entpacken) installieren |


### macOS 🍏

| Variante | Befehl |
|----------|--------|
| **Homebrew (empfohlen)** | `brew install hugo\n# Aktualisieren\nbrew upgrade hugo` |
| **Manuell** | Aktuelles `.tar.gz` von <https://github.com/gohugoio/hugo/releases> laden, entpacken und das Binary `hugo` nach `/usr/local/bin` (oder einen anderen Ordner in deinem `$PATH`) verschieben |


### Windows

| Variante | Befehl / Schritte |
|----------|------------------|
| **Chocolatey** | `choco install hugo-extended` |
| **Scoop** | `scoop install hugo-extended` |
| Manuell | ZIP von GitHub-Releases herunterladen → `hugo.exe` in einen Ordner der `PATH`-Variable legen |

---

## Entwicklungs-Workflow

| Schritt | Befehl / Aktion |
|---------|-----------------|
| **Neue Seite** | `hugo new thema/mein-artikel.md` |
| **Lokaler Live-Reload** | `hugo server` (ändere Dateien → Seite refresht automatisch) |
| **Bauen für Prod** | `hugo --minify` → ergibt statisches HTML/CSS/JS in `public/` |

---

## Struktur des Repos

```text
.
├── content/            # Markdown-Inhalte (Seiten & Blogposts)
│   ├── _index.md       # Startseite
│   └── thema/          # Beispiel-Sektion
├── layouts/            # Hugo-Templates
│   ├── _default/       # baseof.html, single.html, list.html
│   ├── index.html      # eigenes Layout für Startseite
│   └── partials/       # head.html, header.html, footer.html, …
├── static/
│   └── css/main.css    # Globales CSS  (wird 1:1 kopiert)
├── resources/          # ⚠️ Auto-generiert (SCSS-/Image-Pipeline)
├── public/             # ⚠️ Build-Ergebnis (im .gitignore)
├── hugo.toml           # Projekt-Config
└── .gitignore
```

---

## Deployment / Build

*❯ CI/CD-Pipeline (z. B. GitHub Actions, GitLab CI, Netlify Build)*  

```bash
hugo --minify --environment production
```

Das Verzeichnis **`public/`** ist danach sofort auf jeden beliebigen Static-Host (Netlify, Vercel, GitHub Pages, S3 + CloudFront …) übertragbar.

---

## Lizenz & Mitwirken

*© 2025 Bündnis Ost, BÜNDNIS 90/DIE GRÜNEN.*  
Quellcode steht unter der **MIT-Lizenz** → siehe [`LICENSE`](LICENSE).

> **Pull Requests / Issues welcome!**  
> Wir freuen uns über Feedback, Bugreports oder Layout-Verbesserungen. Schreib uns einfach ein Issue oder öffne direkt einen PR.

---

### 🌻 Gemeinsam gestalten wir eine grünere Zukunft – auch im Web!
```

## archetypes/default.md

```md
+++
date = '{{ .Date }}'
draft = true
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
+++
```

## archetypes/events.md

```md
---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
location: ""
start: ""
end: ""
featured: false
image: ""
draft: true
---
Beschreibung hier …
```

## assets/css/app.css

```css
:root {
  --primary: #5b6cf2; --secondary: #00bcd4; --accent: #ff6b35;
  --text: #333; --text-light: #666; --bg: #f8f9fa; --white: #fff;
  --border: #eee; --shadow: 0 2px 8px rgba(0,0,0,0.1); --radius: 12px; --spacing: 20px;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--bg); color: var(--text);
}

.app-container { max-width: 400px; margin: 0 auto; background: var(--white); min-height: 100vh; box-shadow: var(--shadow); }
.header { background: var(--white); padding: 15px var(--spacing); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.page-title { font-size: 20px; font-weight: 600; }
.back-btn, .burger-menu { background: none; border: none; font-size: 24px; cursor: pointer; padding: 5px; }
.content { padding: var(--spacing); }
.hidden { display: none !important; }

.events-grid { display: grid; gap: 16px; margin-bottom: 20px; }
.event-card { background: var(--white); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); cursor: pointer; transition: transform 0.2s; }
.event-card:hover { transform: translateY(-2px); }
.event-image { width: 100%; height: 180px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); position: relative; }

/* Categories kompakt */
.event-card[data-category="be"] .event-image, .event-list-image[data-category="be"] { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
.event-card[data-category="bb"] .event-image, .event-list-image[data-category="bb"] { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
.event-card[data-category="mv"] .event-image, .event-list-image[data-category="mv"] { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.event-card[data-category="sn"] .event-image, .event-list-image[data-category="sn"] { background: linear-gradient(135deg, #8e44ad 0%, #3498db 100%); }
.event-card[data-category="st"] .event-image, .event-list-image[data-category="st"] { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
.event-card[data-category="th"] .event-image, .event-list-image[data-category="th"] { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }

.date-badge { position: absolute; top: 16px; left: 16px; background: var(--accent); color: var(--white); padding: 8px 12px; border-radius: 8px; font-weight: 600; text-align: center; }
.date-badge .day { font-size: 20px; line-height: 1; }
.date-badge .month { font-size: 12px; text-transform: uppercase; }
.bookmark-btn { position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,0.9); border: none; width: 40px; height: 40px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; }

.event-info { padding: var(--spacing); }
.event-title { font-size: 18px; font-weight: 600; margin-bottom: 8px; line-height: 1.3; }
.event-location { color: var(--text-light); font-size: 14px; display: flex; align-items: center; gap: 6px; }

.event-list-item { display: flex; align-items: center; padding: 16px; margin-bottom: 12px; background: var(--white); border-radius: var(--radius); box-shadow: var(--shadow); cursor: pointer; }
.event-list-image { width: 60px; height: 60px; border-radius: 8px; margin-right: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.event-list-info h4 { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
.event-list-date { color: var(--primary); font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 2px; }

.cta-section { background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); margin: var(--spacing) calc(-1 * var(--spacing)); padding: 30px var(--spacing); text-align: center; }
.cta-title { font-size: 32px; font-weight: 700; color: #1976d2; margin-bottom: 8px; }
.cta-subtitle { color: var(--text-light); margin-bottom: 24px; }
.cta-btn { background: var(--secondary); color: var(--white); border: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
.cta-btn:hover { background: #00acc1; }

.burger-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; justify-content: flex-end; }
.burger-content { background: var(--white); width: 280px; height: 100vh; box-shadow: -2px 0 10px rgba(0,0,0,0.1); animation: slideIn 0.3s ease-out; }
@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
.burger-header { padding: var(--spacing); border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
.burger-title { font-size: 20px; font-weight: 600; }
.burger-close { background: none; border: none; font-size: 30px; cursor: pointer; color: var(--text-light); }
.burger-item { display: flex; align-items: center; gap: 16px; padding: 16px var(--spacing); color: var(--text); text-decoration: none; font-size: 16px; font-weight: 500; transition: background 0.2s; }
.burger-item:hover { background: #f5f5f5; }
.burger-item.active { background: #e3f2fd; color: #1976d2; }
.burger-icon { font-size: 20px; width: 24px; text-align: center; }

.event-header-image { width: 100%; height: 250px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); position: relative; }
.event-actions { position: absolute; bottom: var(--spacing); left: var(--spacing); right: var(--spacing); display: flex; gap: 12px; }
.action-btn { flex: 1; padding: 12px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
.map-btn { background: var(--white); color: var(--text); }
.join-btn { background: var(--primary); color: var(--white); }

.event-meta { padding: var(--spacing); }
.event-meta-title { font-size: 24px; font-weight: 700; margin-bottom: var(--spacing); }
.meta-item { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; padding: 12px 0; }
.meta-icon { width: 48px; height: 48px; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; font-size: 20px; }
.date-icon { background: #fff3e0; color: #f57c00; }
.location-icon { background: #e8f5e8; color: #4CAF50; }
.organizer-icon { background: #f3e5f5; color: #9c27b0; }
.meta-text h4 { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
.meta-text p { color: var(--text-light); font-size: 14px; }
.contact-btn { background: #e3f2fd; color: #1976d2; border: none; padding: 8px 16px; border-radius: 16px; font-size: 12px; font-weight: 600; cursor: pointer; }

.description { margin-top: var(--spacing); }
.description h3 { font-size: 18px; font-weight: 600; margin-bottom: 12px; }

.tabs, .view-toggle { display: flex; gap: 8px; margin-bottom: var(--spacing); }
.view-toggle { background: #f0f0f0; border-radius: 24px; padding: 4px; }
.tab, .toggle-btn { padding: 8px 16px; border: none; border-radius: 20px; background: #f5f5f5; color: var(--text-light); cursor: pointer; font-size: 14px; }
.toggle-btn { flex: 1; background: transparent; }
.tab.active, .toggle-btn.active { background: var(--primary); color: var(--white); }
.toggle-btn.active { background: var(--white); color: var(--primary); box-shadow: var(--shadow); }

.search-bar { background: #f5f5f5; border: none; padding: 12px 16px; border-radius: 24px; width: 100%; margin-bottom: var(--spacing); font-size: 16px; }
.map-container { width: 100%; height: 300px; background: linear-gradient(45deg, #e8f5e8, #f0f8ff); border-radius: var(--radius); position: relative; overflow: hidden; }
.map-marker { position: absolute; width: 30px; height: 30px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--white); font-size: 16px; cursor: pointer; animation: pulse 2s infinite; }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
.marker-1 { top: 50px; left: 100px; } .marker-2 { top: 120px; left: 200px; } .marker-3 { top: 180px; left: 150px; }

.floating-btn { position: fixed; bottom: var(--spacing); right: var(--spacing); width: 56px; height: 56px; background: var(--primary); border: none; border-radius: 50%; color: var(--white); font-size: 24px; cursor: pointer; box-shadow: 0 4px 12px rgba(91,108,242,0.4); }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing); }
.section-title { font-size: 24px; font-weight: 700; }
.section-link { color: var(--primary); text-decoration: none; font-size: 14px; font-weight: 500; }

@media (min-width: 768px) { .app-container { max-width: 768px; } .content { padding: 30px; } .section-title { font-size: 28px; } .cta-title { font-size: 36px; } }
@media (min-width: 1024px) {
  .app-container { max-width: 1200px; display: grid; grid-template-columns: 280px 1fr; box-shadow: 0 0 30px rgba(0,0,0,0.1); }
  .desktop-sidebar { background: var(--bg); border-right: 1px solid var(--border); padding: var(--spacing) 0; position: sticky; top: 0; height: 100vh; overflow-y: auto; }
  .sidebar-item { display: flex; align-items: center; gap: 16px; padding: 16px var(--spacing); color: var(--text); text-decoration: none; font-size: 16px; font-weight: 500; transition: background 0.2s; cursor: pointer; }
  .sidebar-item:hover { background: #f0f0f0; } .sidebar-item.active { background: #e3f2fd; color: #1976d2; border-right: 3px solid #1976d2; }
  .sidebar-icon { font-size: 20px; width: 24px; text-align: center; }
  .main-content { background: var(--white); min-height: 100vh; }
  .burger-menu, .burger-overlay { display: none; }
  .header { padding: var(--spacing) 30px; border-bottom: 1px solid var(--border); }
  .page-title { font-size: 24px; }
  .events-grid { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing); }
  .cta-section { margin: 30px -30px; padding: 40px 30px; } .cta-title { font-size: 40px; }
  .floating-btn { bottom: 30px; right: 30px; width: 64px; height: 64px; font-size: 28px; }
  .event-list-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 16px; }
  .map-container { height: 400px; } .search-bar { max-width: 400px; margin: 0 auto 30px; }
}
@media (min-width: 1440px) { .app-container { max-width: 1400px; } .events-grid { grid-template-columns: repeat(3, 1fr); } .content { padding: 40px; } .cta-section { margin: 40px -40px; padding: 50px 40px; } }
```

## assets/js/app.js

```js
class EventApp {
    constructor() {
        this.currentView = 'main';
        this.isDesktop = window.innerWidth >= 1024;
        this.init();
    }

    init() {
        this.bindGlobalFunctions();
        this.bindEvents();
        this.showView('main');
    }

    bindGlobalFunctions() {
        window.showView = this.showView.bind(this);
        window.showEventDetails = this.showEventDetails.bind(this);
        window.toggleBurgerMenu = this.toggleBurgerMenu.bind(this);
    }

    bindEvents() {
        // Tab switching mit Event Delegation
        document.addEventListener('click', (e) => {
            if (e.target.matches('.tab, .toggle-btn')) {
                e.target.parentElement.querySelectorAll('.tab, .toggle-btn').forEach(el => 
                    el.classList.remove('active'));
                e.target.classList.add('active');
            }
        });

        // Resize handling
        window.addEventListener('resize', () => {
            const wasDesktop = this.isDesktop;
            this.isDesktop = window.innerWidth >= 1024;
            if (wasDesktop !== this.isDesktop && this.isDesktop) {
                document.getElementById('burger-overlay')?.classList.add('hidden');
            }
        });
    }

    showView(viewName) {
        // Hide all views
        document.querySelectorAll('[id$="-view"], #event-details').forEach(view => 
            view.classList.add('hidden'));

        // Show target view
        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.remove('hidden');
            this.updateNavigation(viewName);
            this.currentView = viewName;
        }
    }

    showEventDetails() {
        document.querySelectorAll('[id$="-view"]').forEach(view => 
            view.classList.add('hidden'));
        document.getElementById('event-details')?.classList.remove('hidden');
    }

    toggleBurgerMenu() {
        if (!this.isDesktop) {
            document.getElementById('burger-overlay')?.classList.toggle('hidden');
        }
    }

    updateNavigation(viewName) {
        const navMapping = { 'main': 0, 'events': 1, 'calendar': 2 };
        const index = navMapping[viewName];

        if (index !== undefined) {
            // Update burger menu
            document.querySelectorAll('.burger-item, .sidebar-item').forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new EventApp());
```

## assets/postcss.config.js

```js
module.exports = {
  plugins: { autoprefixer: {} }
}
```

## config.toml

```toml
baseURL = "https://bo-page.boogiedev.net/"
languageCode = "de-de"
title = "Bündnis Ost"
theme = ""
```

## content/_index.md

```md
---
title: "Bündnis Ost"
---

## Gemeinsam für eine bessere Zukunft

Dies ist Bündnis Ost.

Wir setzen uns ein für:  
- Klimaschutz  
- Soziale Gerechtigkeit  
- Demokratie und Teilhabe
```

## content/bo-start/index.md

```md
---
title: "BO-start"
date: 2025-07-07
description: "Kommunikation in Ostdeutschland stärken"
---

## Bündnis Ost

Wir sind blablabla

...
```

## content/events/2025_csd_berlin.md

```md
---
title: "CSD Berlin 2025"
date: "2025-07-26T12:00:00+02:00"
location: "Berlin"
startTime: "12:00"
endTime: "18:00"
organizer: "Berliner CSD e.V."
address: "Leipziger Straße / Charlottenstraße, 10117 Berlin"
featured: true
category: "be"
draft: false
---
Beschreibung hier …
```

## content/events/2025_csd_dresden.md

```md
---
title: "CSD Dresden 2025"
date: "2025-05-31T12:00:00+02:00"
location: "Dresden"
startTime: "12:00"
endTime: "16:00"
organizer: "CSD Dresden e.V."
address: "Altmarkt, 01067 Dresden"
featured: false
category: "sn"
draft: false
---
Beschreibung hier …
```

## content/events/2025_csd_erfurt.md

```md
---
title: "CSD Erfurt 2025"
date: "2025-09-06T13:00:00+02:00"
location: "Erfurt"
startTime: "13:00"
endTime: "18:00"
organizer: "Erfurt Pride e.V."
address: "Domplatz, 99084 Erfurt"
featured: false
category: "th"
draft: false
---
Beschreibung hier …
```

## content/events/2025_csd_leipzig.md

```md
---
title: "CSD Leipzig 2025"
date: "2025-06-28T13:00:00+02:00"
location: "Leipzig"
startTime: "13:00"
endTime: "16:00"
organizer: "CSD Leipzig e.V."
address: "Augustusplatz, 04109 Leipzig"
featured: false
category: "sn"
draft: false
---
Beschreibung hier …
```

## content/events/2025_csd_magdeburg.md

```md
---
title: "CSD Magdeburg 2025"
date: "2025-08-23T13:00:00+02:00"
location: "Magdeburg"
startTime: "13:00"
endTime: "17:00"
organizer: "CSD Magdeburg e.V."
address: "Alter Markt, 39104 Magdeburg"
featured: false
category: "st"
draft: false
---
Beschreibung hier …
```

## content/events/2025_csd_potsdam.md

```md
---
title: "CSD Potsdam 2025"
date: "2025-05-17T12:00:00+02:00"
location: "Potsdam"
startTime: "12:00"
endTime: "18:00"
organizer: "Katte e.V."
address: "Alter Markt, 14467 Potsdam"
featured: false
category: "bb"
draft: false
---
Beschreibung hier …
```

## content/events/2025_csd_rostock.md

```md
---
title: "CSD Rostock 2025"
date: "2025-07-19T12:30:00+02:00"
location: "Rostock"
startTime: "12:30"
endTime: "18:00"
organizer: "CSD Rostock e.V."
address: "Neuer Markt, 18055 Rostock"
featured: false
category: "mv"
draft: false
---
Beschreibung hier …
```

## content/events/2025_csd_schwerin.md

```md
---
title: "CSD Schwerin 2025"
date: "2025-06-07T14:00:00+02:00"
location: "Schwerin"
startTime: "14:00"
endTime: "18:00"
organizer: "CSD Schwerin e.V."
address: "Alter Garten, 19055 Schwerin"
featured: false
category: "mv"
draft: false
---
Beschreibung hier …
```

## content/events/beispiel-event.md

```md
---
title: "Beispiel Event"
date: 2025-08-01T11:13:31+02:00
location: ""
start: ""
end: ""
featured: false
image: ""
draft: true
---
Beschreibung hier …
```

## data/categories.yaml

```yaml
be: { name: "Berlin", icon: "❤️", color: "#4CAF50" }
bb: { name: "Brandenburg", icon: "❤️", color: "#fa709a" }
mv: { name: "Mecklenburg-Vorpommern", icon: "❤️", color: "#4facfe" }
sn: { name: "Sachsen", icon: "❤️", color: "#4facfe" }
st: { name: "Sachsen-Anhalt", icon: "❤️", color: "#43e97b" }
th: { name: "Thüringen", icon: "❤️", color: "#4facfe" }
```

## data/events.yaml

```yaml
categories:
  - id: "be"
    name: "Berlin"
    icon: "📢"
  - id: "bb"
    name: "Brandenburg" 
    icon: "🎵"
  - id: "mv"
    name: "Mecklenburg-Vorpommern"
    icon: "📢"
  - id: "sn"
    name: "Sachsen" 
    icon: "🎵"
  - id: "st"
    name: "Sachsen-Anhalt"
    icon: "📢"
  - id: "th"
    name: "Thüringen" 
    icon: "🎵"

locations:
  - name: "Stralsund"
    coordinates: [54.3093, 13.0886]
```

## hugo.toml

```toml
baseURL = "https://bo-page.boogiedev.net/"
languageCode = "de-de"
title = "Bündnis Ost"
```

## hugo_stats.json

```json
{
  "htmlElements": {
    "tags": [
      "a",
      "article",
      "body",
      "div",
      "footer",
      "h1",
      "h2",
      "head",
      "header",
      "html",
      "li",
      "link",
      "main",
      "meta",
      "nav",
      "p",
      "script",
      "section",
      "title",
      "ul"
    ],
    "classes": [
      "container",
      "hero",
      "hover:underline",
      "intro",
      "logo",
      "mb-2",
      "p-4",
      "page",
      "site-footer",
      "site-header",
      "text-blue-600"
    ],
    "ids": [
      "bündnis-ost",
      "gemeinsam-für-eine-bessere-zukunft"
    ]
  }
}
```

## layouts/_default/baseof.html

```html
<!DOCTYPE html>
<html lang="de">
<head>
  {{ partial "head.html" . }}
</head>
<body>
  {{ partial "header.html" . }}
  <main class="container">
    {{ block "main" . }}{{ end }}
  </main>
  {{ partial "footer.html" . }}
</body>
</html>
```

## layouts/_default/list.html

```html
{{ define "main" }}
  <section class="p-4">
    {{ range .Paginator.Pages }}
      <h2 class="mb-2">
        <a href="{{ .RelPermalink }}" class="text-blue-600 hover:underline">
          {{ .Title }}
        </a>
      </h2>
    {{ end }}
  </section>
{{ end }}
```

## layouts/_default/single.html

```html
{{ define "main" }}
<article class="page">
  <h1>{{ .Title }}</h1>
  <div>{{ .Content }}</div>
</article>
{{ end }}
```

## layouts/index.html

```html
{{ define "main" }}
<section class="hero">
  <h1>{{ .Title }}</h1>
  <div class="intro">
    {{ .Content }}
  </div>
</section>
{{ end }}
```

## layouts/partials/event-card.html

```html
<div class="event-card" data-category="{{ .Params.category | default "default" }}" onclick="showEventDetails()">
    <div class="event-image">
        <div class="date-badge">
            <div class="day">{{ .Date.Format "02" }}</div>
            <div class="month">{{ .Date.Format "Jan" | upper }}</div>
        </div>
        <button class="bookmark-btn">薄</button>
    </div>
    <div class="event-info">
        <h3 class="event-title">{{ .Title }}</h3>
        <div class="event-location">桃 {{ .Params.location }}</div>
    </div>
</div>
```

## layouts/partials/event-list-item.html

```html
<div class="event-list-item" onclick="showEventDetails()">
    <div class="event-list-image" data-category="{{ .Params.category | default "default" }}"></div>
    <div class="event-list-info">
        <div class="event-list-date">{{ .Date.Format "Monday, 02.01.2006" }}</div>
        <h4>{{ .Title }}</h4>
    </div>
</div>
```

## layouts/partials/footer.html

```html
<footer class="site-footer">
  <div class="container">
    <p>&copy; 2025 Bündnis Ost</p>
  </div>
</footer>
```

## layouts/partials/head.html

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{ .Title }}</title>
<link rel="stylesheet" href="/css/main.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
```

## layouts/partials/header.html

```html
<header class="site-header">
  <div class="container">
    <h1 class="logo"><a href="/">🌻 GRÜNE IDEEN</a></h1>
    <nav>
      <ul>
        <li><a href="/">Start</a></li>
        <li><a href="/themen/">Themen</a></li>
      </ul>
    </nav>
  </div>
</header>
```

## layouts/partials/scripts.html

```html
{{ $js := resources.Get "js/app.js" | resources.Minify | resources.Fingerprint }}
<script src="{{ $js.RelPermalink }}"></script>
```

## public/bo-start/index.html

```html
<!DOCTYPE html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BO-start</title>
<link rel="stylesheet" href="/css/main.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">

</head>
<body>
  <header class="site-header">
  <div class="container">
    <h1 class="logo"><a href="/">🌻 GRÜNE IDEEN</a></h1>
    <nav>
      <ul>
        <li><a href="/">Start</a></li>
        <li><a href="/themen/">Themen</a></li>
      </ul>
    </nav>
  </div>
</header>

  <main class="container">
    
<article class="page">
  <h1>BO-start</h1>
  <div><h2 id="bündnis-ost">Bündnis Ost</h2>
<p>Wir sind blablabla</p>
<p>&hellip;</p>
</div>
</article>

  </main>
  <footer class="site-footer">
  <div class="container">
    <p>&copy; 2025 Bündnis Ost</p>
  </div>
</footer>

</body>
</html>
```

## public/categories/index.html

```html
<!DOCTYPE html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Categories</title>
<link rel="stylesheet" href="/css/main.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">

</head>
<body>
  <header class="site-header">
  <div class="container">
    <h1 class="logo"><a href="/">🌻 GRÜNE IDEEN</a></h1>
    <nav>
      <ul>
        <li><a href="/">Start</a></li>
        <li><a href="/themen/">Themen</a></li>
      </ul>
    </nav>
  </div>
</header>

  <main class="container">
    
  <section class="p-4">
    
  </section>

  </main>
  <footer class="site-footer">
  <div class="container">
    <p>&copy; 2025 Bündnis Ost</p>
  </div>
</footer>

</body>
</html>
```

## public/categories/index.xml

```xml
<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Categories on Bündnis Ost</title>
    <link>http://localhost:1313/categories/</link>
    <description>Recent content in Categories on Bündnis Ost</description>
    <generator>Hugo</generator>
    <language>de-de</language>
    <atom:link href="http://localhost:1313/categories/index.xml" rel="self" type="application/rss+xml" />
  </channel>
</rss>
```

## public/categories/page/1/index.html

```html
<!DOCTYPE html>
<html lang="de-de">
  <head>
    <title>http://localhost:1313/categories/</title>
    <link rel="canonical" href="http://localhost:1313/categories/">
    <meta name="robots" content="noindex">
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0; url=http://localhost:1313/categories/">
  </head>
</html>
```

## public/css/app.min.15276f049e4d4c5994584f49b3a2ce3f80842c8ebbddb1ec0889b0854701be0a.css

```css
:root{--primary:#5b6cf2;--secondary:#00bcd4;--accent:#ff6b35;--text:#333;--text-light:#666;--bg:#f8f9fa;--white:#fff;--border:#eee;--shadow:0 2px 8px rgba(0,0,0,0.1);--radius:12px;--spacing:20px}*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,sans-serif;background:var(--bg);color:var(--text)}.app-container{max-width:400px;margin:0 auto;background:var(--white);min-height:100vh;box-shadow:var(--shadow)}.header{background:var(--white);padding:15px var(--spacing);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.page-title{font-size:20px;font-weight:600}.back-btn,.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.content{padding:var(--spacing)}.hidden{display:none !important}.events-grid{display:grid;gap:16px;margin-bottom:20px}.event-card{background:var(--white);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative}.event-card[data-category=be] .event-image,.event-list-image[data-category=be]{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.event-card[data-category=bb] .event-image,.event-list-image[data-category=bb]{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-card[data-category=mv] .event-image,.event-list-image[data-category=mv]{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.event-card[data-category=sn] .event-image,.event-list-image[data-category=sn]{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.event-card[data-category=st] .event-image,.event-list-image[data-category=st]{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.event-card[data-category=th] .event-image,.event-list-image[data-category=th]{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.date-badge{position:absolute;top:16px;left:16px;background:var(--accent);color:var(--white);padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:var(--spacing)}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:var(--text-light);font-size:14px;display:flex;align-items:center;gap:6px}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:var(--white);border-radius:var(--radius);box-shadow:var(--shadow);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:var(--primary);font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:var(--spacing)calc(-1 * var(--spacing));padding:30px var(--spacing);text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:var(--text-light);margin-bottom:24px}.cta-btn{background:var(--secondary);color:var(--white);border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:var(--white);width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:var(--spacing);border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:var(--text-light)}.burger-item{display:flex;align-items:center;gap:16px;padding:16px var(--spacing);color:var(--text);text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.event-header-image{width:100%;height:250px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative}.event-actions{position:absolute;bottom:var(--spacing);left:var(--spacing);right:var(--spacing);display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:var(--white);color:var(--text)}.join-btn{background:var(--primary);color:var(--white)}.event-meta{padding:var(--spacing)}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:var(--spacing)}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:var(--radius);display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:var(--text-light);font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:var(--spacing)}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs,.view-toggle{display:flex;gap:8px;margin-bottom:var(--spacing)}.view-toggle{background:#f0f0f0;border-radius:24px;padding:4px}.tab,.toggle-btn{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:var(--text-light);cursor:pointer;font-size:14px}.toggle-btn{flex:1;background:0 0}.tab.active,.toggle-btn.active{background:var(--primary);color:var(--white)}.toggle-btn.active{background:var(--white);color:var(--primary);box-shadow:var(--shadow)}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:var(--spacing);font-size:16px}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:var(--radius);position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:var(--primary);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--white);font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:var(--spacing);right:var(--spacing);width:56px;height:56px;background:var(--primary);border:none;border-radius:50%;color:var(--white);font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--spacing)}.section-title{font-size:24px;font-weight:700}.section-link{color:var(--primary);text-decoration:none;font-size:14px;font-weight:500}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:var(--bg);border-right:1px solid var(--border);padding:var(--spacing)0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px var(--spacing);color:var(--text);text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:var(--white);min-height:100vh}.burger-menu,.burger-overlay{display:none}.header{padding:var(--spacing)30px;border-bottom:1px solid var(--border)}.page-title{font-size:24px}.events-grid{grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:var(--spacing)}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.cta-section{margin:40px -40px;padding:50px 40px}}
```

## public/css/app.min.1af5fe6f6ae0f0213e3c9c7ad6300aff50c7280ad45247426e94156cbe594385.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.story-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.bb-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.bb-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.mv-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.mv-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/app.min.21a64576266d81eb4e990104e88fecd2fed10cb7a3f38b0a7190a3d5000b8197.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.profile-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
```

## public/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.story-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.bb-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.bb-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.mv-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.mv-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.sn-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.sn-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.st-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.st-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.th-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.th-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/app.min.24c3445dbb515aa2c87e79ac82dae8efcebb9d690eef8a0ceb059a0f80245324.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.profile-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.demonstration-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.festival-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.demonstration-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.festival-event .event-list-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}
```

## public/css/app.min.327dedd89b29c06e355c283d2fe67434a8f863b768c9406c103e3fdc92116dd8.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.story-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.bb-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.bb-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.mv-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.mv-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.sn-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.sn-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/app.min.3ce139eba7863bbe330da05a9dc498cf184e60de62df01f5639c5b086a7ea5b9.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.story-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/app.min.50af8b6046dbd5beeb5da7628fcc9bbdd5688eb8fb9511d0a6199483f8821b03.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.story-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.bb-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.bb-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.mv-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.mv-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.sn-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.sn-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.st-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/app.min.651bd4d5f626fd1f580ed0a9abc888103b316898385496439d540adb6a54f0c9.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.profile-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.demonstration-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.festival-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.demonstration-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.festival-event .event-list-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}
```

## public/css/app.min.7fbcfc87ea363e3ef498454a2ef911c068880eb404a89483eec1f6b726bf7abf.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.story-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.event-card[data-category=be] .event-image{background:var(--gradient-be)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/app.min.9451ae4032fd1e7da840ff23c005ea13d1a3ca540ba80f14bd36cb1709ee750e.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.demonstration-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.festival-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.demonstration-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.festival-event .event-list-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/app.min.9e6c32bb4b4b0fe12cc6f58dc4080f4e77343419cf836ee13c2fa7bfc9b2d0d5.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.story-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.bb-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/app.min.a9c20920d978e768be4a14676230f719fcecdbeda592d0f25bb6f80d2d2cbd26.css

```css
:root{--primary:#5b6cf2;--secondary:#00bcd4;--accent:#ff6b35;--success:#4CAF50;--text:#333;--text-light:#666;--bg:#f8f9fa;--white:#fff;--border:#eee;--shadow:0 2px 8px rgba(0,0,0,0.1);--radius:12px;--spacing:20px;--gradient-be:linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);--gradient-bb:linear-gradient(135deg, #fa709a 0%, #fee140 100%);--gradient-mv:linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);--gradient-sn:linear-gradient(135deg, #8e44ad 0%, #3498db 100%);--gradient-st:linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);--gradient-th:linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);--gradient-default:linear-gradient(135deg, #667eea 0%, #764ba2 100%)}*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,sans-serif;background:var(--bg);color:var(--text)}.app-container{max-width:400px;margin:0 auto;background:var(--white);min-height:100vh;box-shadow:var(--shadow)}.header{background:var(--white);padding:15px var(--spacing);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.page-title{font-size:20px;font-weight:600}.back-btn,.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.content{padding:var(--spacing)}.hidden{display:none !important}.events-grid{display:grid;gap:16px;margin-bottom:20px}.event-card{background:var(--white);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:var(--gradient-default);position:relative}.event-card[data-category=be] .event-image,.event-card[data-category=be] .event-list-image{background:var(--gradient-be)}.event-card[data-category=bb] .event-image,.event-card[data-category=bb] .event-list-image{background:var(--gradient-bb)}.event-card[data-category=mv] .event-image,.event-card[data-category=mv] .event-list-image{background:var(--gradient-mv)}.event-card[data-category=sn] .event-image,.event-card[data-category=sn] .event-list-image{background:var(--gradient-sn)}.event-card[data-category=st] .event-image,.event-card[data-category=st] .event-list-image{background:var(--gradient-st)}.event-card[data-category=th] .event-image,.event-card[data-category=th] .event-list-image{background:var(--gradient-th)}.date-badge{position:absolute;top:16px;left:16px;background:var(--accent);color:var(--white);padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:var(--spacing)}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:var(--text-light);font-size:14px;display:flex;align-items:center;gap:6px}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:var(--white);border-radius:var(--radius);box-shadow:var(--shadow);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:var(--gradient-default)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:var(--primary);font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:var(--spacing)calc(-1 * var(--spacing));padding:30px var(--spacing);text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:var(--text-light);margin-bottom:24px}.cta-btn{background:var(--secondary);color:var(--white);border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:var(--white);width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:var(--spacing);border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:var(--text-light)}.burger-item{display:flex;align-items:center;gap:16px;padding:16px var(--spacing);color:var(--text);text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.event-header-image{width:100%;height:250px;background:var(--gradient-default);position:relative}.event-actions{position:absolute;bottom:var(--spacing);left:var(--spacing);right:var(--spacing);display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:var(--white);color:var(--text)}.join-btn{background:var(--primary);color:var(--white)}.event-meta{padding:var(--spacing)}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:var(--spacing)}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:var(--radius);display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:var(--success)}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:var(--text-light);font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:var(--spacing)}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs,.view-toggle{display:flex;gap:8px;margin-bottom:var(--spacing)}.view-toggle{background:#f0f0f0;border-radius:24px;padding:4px}.tab,.toggle-btn{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:var(--text-light);cursor:pointer;font-size:14px}.toggle-btn{flex:1;background:0 0}.tab.active,.toggle-btn.active{background:var(--primary);color:var(--white)}.toggle-btn.active{background:var(--white);color:var(--primary);box-shadow:var(--shadow)}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:var(--spacing);font-size:16px}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:var(--radius);position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:var(--primary);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--white);font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:var(--spacing);right:var(--spacing);width:56px;height:56px;background:var(--primary);border:none;border-radius:50%;color:var(--white);font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--spacing)}.section-title{font-size:24px;font-weight:700}.section-link{color:var(--primary);text-decoration:none;font-size:14px;font-weight:500}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:var(--bg);border-right:1px solid var(--border);padding:var(--spacing)0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px var(--spacing);color:var(--text);text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:var(--white);min-height:100vh}.burger-menu,.burger-overlay{display:none}.header{padding:var(--spacing)30px;border-bottom:1px solid var(--border)}.page-title{font-size:24px}.events-grid{grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:var(--spacing)}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.cta-section{margin:40px -40px;padding:50px 40px}}
```

## public/css/app.min.b0afdf2704681cf209e2ddfaa114df71b6f450deac358b7a8e2c9a9fda1b5688.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.story-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/app.min.c0490eea2e72e645c7067e0e99e3887dca6e9ec6f62954ccd6ff7cff0f79a310.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.story-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.demonstration-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/app.min.c18ce0f074b0f3b6a984e2aec42ea65c54089c1948dc77a65b6e3c07e5da1bbe.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.story-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.bb-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.bb-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.mv-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.mv-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/app.min.c8c2e940f4beee49e65665be7a2b3f784a234032856eaf0099d53d42765584e3.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.story-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.bb-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.bb-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.mv-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.mv-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.sn-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.sn-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.st-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.st-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/app.min.c8f53fb9721680aeb75423b48ac4699938797a3b362bf8d38935070ff063919c.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.story-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.bb-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.bb-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.mv-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.mv-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/app.min.d093531cfdc1e32caead964a383d366df707874f9c0630513785a8c4decbb4c5.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.story-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.bb-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.bb-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.mv-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.mv-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.sn-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.sn-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.st-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.st-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.th-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/app.min.d79981a75acf8e16e4d9bcf4e42cf51441ef838b64b58158382a785e297ff875.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.story-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.bb-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.bb-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/app.min.e5f33e313dfa15db7de79e6b934db26225f5bb931a8444bf36ddc008f04cee64.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.profile-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.demonstration-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.festival-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.demonstration-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.festival-event .event-list-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/app.min.e781daa0d4163edb35488da2a557dd99d2859a4db468bcbb26b225f9e3d5683f.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.profile-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.demonstration-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.festival-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.demonstration-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.festival-event .event-list-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/app.min.e8aaf52f69716b1f9a4094f87ccc6d239d71e6a0f8a869f9d091c3a9eb20b132.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.profile-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.demonstration-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.festival-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.demonstration-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.festival-event .event-list-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}
```

## public/css/app.min.ebeacc18fff63ee384c7459b971a9bdf79df17bcbecb8722dc00c358f4d9dace.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.story-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.bb-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.bb-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.mv-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/app.min.f330c15c4841392ba0e03794cd888356db890de2dc5da876e4d69bf7d3c515ef.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.story-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.demonstration-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.festival-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.demonstration-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.festival-event .event-list-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/app.min.f74d62d4a22077a8bd9ee370b498cf95dbbf27b725a667d9c099c911e8e803c8.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.story-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.be-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.be-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/app.min.fc088c0bf803e07c8531c09d456524fff3e3ab2aba6ff5012cbac23826b12014.css

```css
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif;background:#f8f9fa;color:#333}.app-container{max-width:400px;margin:0 auto;background:#fff;min-height:100vh;position:relative;box-shadow:0 0 20px rgba(0,0,0,.1)}.header{background:#fff;padding:15px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.status-bar{background:#000;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}.back-btn{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.page-title{font-size:20px;font-weight:600}.menu-btn{background:0 0;border:none;font-size:24px;cursor:pointer}.content{padding:20px}.event-card{background:#fff;border-radius:12px;margin-bottom:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;background-size:cover;background-position:50%}.demo-event .event-image{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23e8f5e8" width="400" height="200"/><circle cx="200" cy="100" r="60" fill="%234CAF50"/><text x="200" y="105" text-anchor="middle" fill="white" font-size="18" font-family="Arial">DEMO</text></svg>')50%/cover}.date-badge{position:absolute;top:16px;left:16px;background:#ff6b35;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:20px}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:#666;font-size:14px;display:flex;align-items:center;gap:6px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:20px -20px;padding:30px 20px;text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:#666;margin-bottom:24px}.cta-btn{background:#00bcd4;color:#fff;border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:400px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;padding:12px 0}.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;color:#666;text-decoration:none;font-size:12px;padding:8px;border-radius:8px;transition:color .2s}.nav-item.active{color:#5b6cf2}.nav-icon{width:24px;height:24px;border-radius:50%}.explore-icon{background:#5b6cf2}.events-icon{background:#ddd}.map-icon{background:#ddd}.story-icon{background:#ddd}.search-results{display:none}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:20px;font-size:16px}.calendar-view{display:none}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.calendar-nav{background:0 0;border:none;font-size:20px;cursor:pointer;padding:8px}.calendar-title{font-size:20px;font-weight:600}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px}.calendar-day-header{text-align:center;font-size:12px;color:#666;font-weight:600;padding:8px 0}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;font-weight:500}.calendar-day.has-event{background:#e3f2fd;color:#1976d2}.calendar-day.selected{background:#1976d2;color:#fff}.event-details{display:none}.event-header-image{width:100%;height:250px;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%234CAF50" width="400" height="250"/><circle cx="200" cy="125" r="80" fill="%23388E3C"/><text x="200" y="130" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Vielfalt wagen</text></svg>')50%/cover;position:relative}.event-actions{position:absolute;bottom:20px;left:20px;right:20px;display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:#fff;color:#333}.join-btn{background:#5b6cf2;color:#fff}.event-meta{padding:20px}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:20px}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:#666;font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:20px}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:#666;cursor:pointer;font-size:14px}.tab.active{background:#5b6cf2;color:#fff}.view-toggle{display:flex;background:#f0f0f0;border-radius:24px;padding:4px;margin-bottom:20px}.toggle-btn{flex:1;padding:8px 16px;border:none;border-radius:20px;background:0 0;color:#666;cursor:pointer;font-size:14px}.toggle-btn.active{background:#fff;color:#5b6cf2;box-shadow:0 2px 4px rgba(0,0,0,.1)}.hidden{display:none !important}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:12px;position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:#5b6cf2;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:80px;right:20px;width:56px;height:56px;background:#5b6cf2;border:none;border-radius:50%;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.jazz-event{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.mothers-day{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)}.leadership{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.kids-safe{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.music-festival{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:#5b6cf2;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.no-events{text-align:center;padding:60px 20px}.no-events-icon{width:80px;height:80px;margin:0 auto 20px;background:#f0f0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#999}.section-title{font-size:24px;font-weight:700;margin-bottom:8px}.section-link{color:#5b6cf2;text-decoration:none;font-size:14px;font-weight:500}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.festival-event .event-image{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.demonstration-event .event-list-image{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.status-bar{display:none}.bottom-nav{display:none}.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:#fff;width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:#666}.burger-nav{padding:20px 0}.burger-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.floating-btn{bottom:20px}.content{padding:20px;padding-bottom:20px}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.event-card{margin-bottom:20px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;gap:0;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:#f8f9fa;border-right:1px solid #eee;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-nav{padding:20px 0}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px 20px;color:#333;text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:#fff;min-height:100vh}.burger-menu{display:none}.burger-overlay{display:none}.header{padding:20px 30px;border-bottom:1px solid #eee}.page-title{font-size:24px}.events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px}.event-card{margin-bottom:0}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px;display:block}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.header{padding:25px 40px}.cta-section{margin:40px -40px;padding:50px 40px}}@media(min-width:1024px){.events-grid .event-card{height:fit-content}.event-image{height:200px}.event-info{padding:24px}.event-title{font-size:20px;margin-bottom:12px}.event-location{font-size:16px}.event-list-item{padding:20px;margin-bottom:16px}.event-list-image{width:80px;height:80px;margin-right:20px}.event-list-info h4{font-size:18px;margin-bottom:8px}.event-list-date{font-size:14px;margin-bottom:4px}}
```

## public/css/main.css

```css
body {
  font-family: 'Open Sans', sans-serif;
  margin: 0;
  background-color: #ffffff;
  color: #222;
}

.container {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
}

.site-header {
  background-color: #64A12D; /* GRÜN */
  color: white;
  padding: 1rem 0;
}

.site-header .logo {
  margin: 0;
  font-weight: bold;
}

.site-header a {
  color: white;
  text-decoration: none;
  font-weight: 600;
}

.site-header nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1rem;
}

.hero {
  padding: 2rem 0;
  background: #f0f9eb;
  border-bottom: 2px solid #64A12D;
}

h1, h2 {
  color: #64A12D;
}

.site-footer {
  background: #eeeeee;
  padding: 1rem 0;
  text-align: center;
  margin-top: 2rem;
  font-size: 0.9rem;
}
```

## public/events/2025_csd_/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/2025_csd_-copy-10/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/2025_csd_-copy-2/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/2025_csd_-copy-3/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/2025_csd_-copy-4/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/2025_csd_-copy-5/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/2025_csd_-copy-6/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/2025_csd_-copy-7/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/2025_csd_-copy-8/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/2025_csd_-copy-9/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/2025_csd_berlin/index.html

```html
<!DOCTYPE html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CSD Berlin 2025</title>
<link rel="stylesheet" href="/css/main.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">

</head>
<body>
  <header class="site-header">
  <div class="container">
    <h1 class="logo"><a href="/">🌻 GRÜNE IDEEN</a></h1>
    <nav>
      <ul>
        <li><a href="/">Start</a></li>
        <li><a href="/themen/">Themen</a></li>
      </ul>
    </nav>
  </div>
</header>

  <main class="container">
    
<article class="page">
  <h1>CSD Berlin 2025</h1>
  <div><p>Beschreibung hier …</p>
</div>
</article>

  </main>
  <footer class="site-footer">
  <div class="container">
    <p>&copy; 2025 Bündnis Ost</p>
  </div>
</footer>

</body>
</html>
```

## public/events/2025_csd_dresden/index.html

```html
<!DOCTYPE html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CSD Dresden 2025</title>
<link rel="stylesheet" href="/css/main.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">

</head>
<body>
  <header class="site-header">
  <div class="container">
    <h1 class="logo"><a href="/">🌻 GRÜNE IDEEN</a></h1>
    <nav>
      <ul>
        <li><a href="/">Start</a></li>
        <li><a href="/themen/">Themen</a></li>
      </ul>
    </nav>
  </div>
</header>

  <main class="container">
    
<article class="page">
  <h1>CSD Dresden 2025</h1>
  <div><p>Beschreibung hier …</p>
</div>
</article>

  </main>
  <footer class="site-footer">
  <div class="container">
    <p>&copy; 2025 Bündnis Ost</p>
  </div>
</footer>

</body>
</html>
```

## public/events/2025_csd_erfurt/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/2025_csd_leipzig/index.html

```html
<!DOCTYPE html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CSD Leipzig 2025</title>
<link rel="stylesheet" href="/css/main.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">

</head>
<body>
  <header class="site-header">
  <div class="container">
    <h1 class="logo"><a href="/">🌻 GRÜNE IDEEN</a></h1>
    <nav>
      <ul>
        <li><a href="/">Start</a></li>
        <li><a href="/themen/">Themen</a></li>
      </ul>
    </nav>
  </div>
</header>

  <main class="container">
    
<article class="page">
  <h1>CSD Leipzig 2025</h1>
  <div><p>Beschreibung hier …</p>
</div>
</article>

  </main>
  <footer class="site-footer">
  <div class="container">
    <p>&copy; 2025 Bündnis Ost</p>
  </div>
</footer>

</body>
</html>
```

## public/events/2025_csd_magdeburg/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Rostock 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/2025_csd_potsdam/index.html

```html
<!DOCTYPE html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CSD Potsdam 2025</title>
<link rel="stylesheet" href="/css/main.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">

</head>
<body>
  <header class="site-header">
  <div class="container">
    <h1 class="logo"><a href="/">🌻 GRÜNE IDEEN</a></h1>
    <nav>
      <ul>
        <li><a href="/">Start</a></li>
        <li><a href="/themen/">Themen</a></li>
      </ul>
    </nav>
  </div>
</header>

  <main class="container">
    
<article class="page">
  <h1>CSD Potsdam 2025</h1>
  <div><p>Beschreibung hier …</p>
</div>
</article>

  </main>
  <footer class="site-footer">
  <div class="container">
    <p>&copy; 2025 Bündnis Ost</p>
  </div>
</footer>

</body>
</html>
```

## public/events/2025_csd_rostock/index.html

```html
<!DOCTYPE html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CSD Rostock 2025</title>
<link rel="stylesheet" href="/css/main.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">

</head>
<body>
  <header class="site-header">
  <div class="container">
    <h1 class="logo"><a href="/">🌻 GRÜNE IDEEN</a></h1>
    <nav>
      <ul>
        <li><a href="/">Start</a></li>
        <li><a href="/themen/">Themen</a></li>
      </ul>
    </nav>
  </div>
</header>

  <main class="container">
    
<article class="page">
  <h1>CSD Rostock 2025</h1>
  <div><p>Beschreibung hier …</p>
</div>
</article>

  </main>
  <footer class="site-footer">
  <div class="container">
    <p>&copy; 2025 Bündnis Ost</p>
  </div>
</footer>

</body>
</html>
```

## public/events/2025_csd_schwerin/index.html

```html
<!DOCTYPE html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CSD Schwerin 2025</title>
<link rel="stylesheet" href="/css/main.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">

</head>
<body>
  <header class="site-header">
  <div class="container">
    <h1 class="logo"><a href="/">🌻 GRÜNE IDEEN</a></h1>
    <nav>
      <ul>
        <li><a href="/">Start</a></li>
        <li><a href="/themen/">Themen</a></li>
      </ul>
    </nav>
  </div>
</header>

  <main class="container">
    
<article class="page">
  <h1>CSD Schwerin 2025</h1>
  <div><p>Beschreibung hier …</p>
</div>
</article>

  </main>
  <footer class="site-footer">
  <div class="container">
    <p>&copy; 2025 Bündnis Ost</p>
  </div>
</footer>

</body>
</html>
```

## public/events/beispiel-event/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Beispiel Event | Event-App</title>


<link rel="stylesheet" href="/css/app.min.15276f049e4d4c5994584f49b3a2ce3f80842c8ebbddb1ec0889b0854701be0a.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.aa6ac548cdc572f5c1e488f73ce5728a14a6ad3054ae031d659ea259182eae35.js"></script>
</body>
</html>
```

## public/events/csd_events_ostdeutschland_2025/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/csd_events_ostdeutschland_2025-copy/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/csd_events_ostdeutschland_2025-copy-10/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/csd_events_ostdeutschland_2025-copy-2/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/csd_events_ostdeutschland_2025-copy-3/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/csd_events_ostdeutschland_2025-copy-4/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/csd_events_ostdeutschland_2025-copy-5/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/csd_events_ostdeutschland_2025-copy-6/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/csd_events_ostdeutschland_2025-copy-7/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/csd_events_ostdeutschland_2025-copy-8/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/csd_events_ostdeutschland_2025-copy-9/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false">title: &ldquo;CSD Dresden 2025&rdquo;
date: &ldquo;2025-05-31T12:00:00+02:00&rdquo;
location: &ldquo;Dresden&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Dresden e.V.&rdquo;
address: &ldquo;Altmarkt, 01067 Dresden&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-1">title: &ldquo;CSD Schwerin 2025&rdquo;
date: &ldquo;2025-06-07T14:00:00+02:00&rdquo;
location: &ldquo;Schwerin&rdquo;
startTime: &ldquo;14:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Schwerin e.V.&rdquo;
address: &ldquo;Alter Garten, 19055 Schwerin&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-2">title: &ldquo;CSD Leipzig 2025&rdquo;
date: &ldquo;2025-06-28T13:00:00+02:00&rdquo;
location: &ldquo;Leipzig&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;16:00&rdquo;
organizer: &ldquo;CSD Leipzig e.V.&rdquo;
address: &ldquo;Augustusplatz, 04109 Leipzig&rdquo;
featured: false
category: &ldquo;sn&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-3">title: &ldquo;CSD Rostock 2025&rdquo;
date: &ldquo;2025-07-19T12:30:00+02:00&rdquo;
location: &ldquo;Rostock&rdquo;
startTime: &ldquo;12:30&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;CSD Rostock e.V.&rdquo;
address: &ldquo;Neuer Markt, 18055 Rostock&rdquo;
featured: false
category: &ldquo;mv&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-4">title: &ldquo;CSD Berlin 2025&rdquo;
date: &ldquo;2025-07-26T12:00:00+02:00&rdquo;
location: &ldquo;Berlin&rdquo;
startTime: &ldquo;12:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Berliner CSD e.V.&rdquo;
address: &ldquo;Leipziger Straße / Charlottenstraße, 10117 Berlin&rdquo;
featured: true
category: &ldquo;be&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-5">title: &ldquo;CSD Magdeburg 2025&rdquo;
date: &ldquo;2025-08-23T13:00:00+02:00&rdquo;
location: &ldquo;Magdeburg&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;17:00&rdquo;
organizer: &ldquo;CSD Magdeburg e.V.&rdquo;
address: &ldquo;Alter Markt, 39104 Magdeburg&rdquo;
featured: false
category: &ldquo;st&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>
<hr>
<h2 id="draft-false-6">title: &ldquo;CSD Erfurt 2025&rdquo;
date: &ldquo;2025-09-06T13:00:00+02:00&rdquo;
location: &ldquo;Erfurt&rdquo;
startTime: &ldquo;13:00&rdquo;
endTime: &ldquo;18:00&rdquo;
organizer: &ldquo;Erfurt Pride e.V.&rdquo;
address: &ldquo;Domplatz, 99084 Erfurt&rdquo;
featured: false
category: &ldquo;th&rdquo;
draft: false</h2>
<p>Beschreibung hier …</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/events/index.html

```html
<!DOCTYPE html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Events</title>
<link rel="stylesheet" href="/css/main.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">

</head>
<body>
  <header class="site-header">
  <div class="container">
    <h1 class="logo"><a href="/">🌻 GRÜNE IDEEN</a></h1>
    <nav>
      <ul>
        <li><a href="/">Start</a></li>
        <li><a href="/themen/">Themen</a></li>
      </ul>
    </nav>
  </div>
</header>

  <main class="container">
    
  <section class="p-4">
    
      <h2 class="mb-2">
        <a href="/events/2025_csd_berlin/" class="text-blue-600 hover:underline">
          CSD Berlin 2025
        </a>
      </h2>
    
      <h2 class="mb-2">
        <a href="/events/2025_csd_rostock/" class="text-blue-600 hover:underline">
          CSD Rostock 2025
        </a>
      </h2>
    
      <h2 class="mb-2">
        <a href="/events/2025_csd_leipzig/" class="text-blue-600 hover:underline">
          CSD Leipzig 2025
        </a>
      </h2>
    
      <h2 class="mb-2">
        <a href="/events/2025_csd_schwerin/" class="text-blue-600 hover:underline">
          CSD Schwerin 2025
        </a>
      </h2>
    
      <h2 class="mb-2">
        <a href="/events/2025_csd_dresden/" class="text-blue-600 hover:underline">
          CSD Dresden 2025
        </a>
      </h2>
    
      <h2 class="mb-2">
        <a href="/events/2025_csd_potsdam/" class="text-blue-600 hover:underline">
          CSD Potsdam 2025
        </a>
      </h2>
    
  </section>

  </main>
  <footer class="site-footer">
  <div class="container">
    <p>&copy; 2025 Bündnis Ost</p>
  </div>
</footer>

</body>
</html>
```

## public/events/index.xml

```xml
<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Events on Bündnis Ost</title>
    <link>http://localhost:1313/events/</link>
    <description>Recent content in Events on Bündnis Ost</description>
    <generator>Hugo</generator>
    <language>de-de</language>
    <lastBuildDate>Sat, 26 Jul 2025 12:00:00 +0200</lastBuildDate>
    <atom:link href="http://localhost:1313/events/index.xml" rel="self" type="application/rss+xml" />
    <item>
      <title>CSD Berlin 2025</title>
      <link>http://localhost:1313/events/2025_csd_berlin/</link>
      <pubDate>Sat, 26 Jul 2025 12:00:00 +0200</pubDate>
      <guid>http://localhost:1313/events/2025_csd_berlin/</guid>
      <description>&lt;p&gt;Beschreibung hier …&lt;/p&gt;</description>
    </item>
    <item>
      <title>CSD Rostock 2025</title>
      <link>http://localhost:1313/events/2025_csd_rostock/</link>
      <pubDate>Sat, 19 Jul 2025 12:30:00 +0200</pubDate>
      <guid>http://localhost:1313/events/2025_csd_rostock/</guid>
      <description>&lt;p&gt;Beschreibung hier …&lt;/p&gt;</description>
    </item>
    <item>
      <title>CSD Leipzig 2025</title>
      <link>http://localhost:1313/events/2025_csd_leipzig/</link>
      <pubDate>Sat, 28 Jun 2025 13:00:00 +0200</pubDate>
      <guid>http://localhost:1313/events/2025_csd_leipzig/</guid>
      <description>&lt;p&gt;Beschreibung hier …&lt;/p&gt;</description>
    </item>
    <item>
      <title>CSD Schwerin 2025</title>
      <link>http://localhost:1313/events/2025_csd_schwerin/</link>
      <pubDate>Sat, 07 Jun 2025 14:00:00 +0200</pubDate>
      <guid>http://localhost:1313/events/2025_csd_schwerin/</guid>
      <description>&lt;p&gt;Beschreibung hier …&lt;/p&gt;</description>
    </item>
    <item>
      <title>CSD Dresden 2025</title>
      <link>http://localhost:1313/events/2025_csd_dresden/</link>
      <pubDate>Sat, 31 May 2025 12:00:00 +0200</pubDate>
      <guid>http://localhost:1313/events/2025_csd_dresden/</guid>
      <description>&lt;p&gt;Beschreibung hier …&lt;/p&gt;</description>
    </item>
    <item>
      <title>CSD Potsdam 2025</title>
      <link>http://localhost:1313/events/2025_csd_potsdam/</link>
      <pubDate>Sat, 17 May 2025 12:00:00 +0200</pubDate>
      <guid>http://localhost:1313/events/2025_csd_potsdam/</guid>
      <description>&lt;p&gt;Beschreibung hier …&lt;/p&gt;</description>
    </item>
  </channel>
</rss>
```

## public/events/page/1/index.html

```html
<!DOCTYPE html>
<html lang="de-de">
  <head>
    <title>http://localhost:1313/events/</title>
    <link rel="canonical" href="http://localhost:1313/events/">
    <meta name="robots" content="noindex">
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0; url=http://localhost:1313/events/">
  </head>
</html>
```

## public/events/vielfalt-wagen/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DEMO: Keine Kürzungen im Schulsystem JETZT! | Event Management App</title>


<link rel="stylesheet" href="/css/app.min.245e559657d69f9c648683504976b832b6bc1b0c412f23b6cab2c0c955dcd4cd.css">
</head>
<body>
  <div class="app-container">
    
  <article class="p-4 prose">
    <p>Die geplanten Kürzungen im Doppelhaushalt 2024/2025 bedrohen die soziale Arbeit in unserer Stadt. Dringend notwendige Angebote.</p>

  </article>

  </div>
  
<script src="/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js"></script>
</body>
</html>
```

## public/index.html

```html
<!DOCTYPE html>
<html lang="de">
<head>
	<meta name="generator" content="Hugo 0.147.9"><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Bündnis Ost</title>
<link rel="stylesheet" href="/css/main.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">

</head>
<body>
  <header class="site-header">
  <div class="container">
    <h1 class="logo"><a href="/">🌻 GRÜNE IDEEN</a></h1>
    <nav>
      <ul>
        <li><a href="/">Start</a></li>
        <li><a href="/themen/">Themen</a></li>
      </ul>
    </nav>
  </div>
</header>

  <main class="container">
    
<section class="hero">
  <h1>Bündnis Ost</h1>
  <div class="intro">
    <h2 id="gemeinsam-für-eine-bessere-zukunft">Gemeinsam für eine bessere Zukunft</h2>
<p>Dies ist Bündnis Ost.</p>
<p>Wir setzen uns ein für:</p>
<ul>
<li>Klimaschutz</li>
<li>Soziale Gerechtigkeit</li>
<li>Demokratie und Teilhabe</li>
</ul>

  </div>
</section>

  </main>
  <footer class="site-footer">
  <div class="container">
    <p>&copy; 2025 Bündnis Ost</p>
  </div>
</footer>

</body>
</html>
```

## public/index.xml

```xml
<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Bündnis Ost</title>
    <link>http://localhost:1313/</link>
    <description>Recent content on Bündnis Ost</description>
    <generator>Hugo</generator>
    <language>de-de</language>
    <lastBuildDate>Mon, 07 Jul 2025 00:00:00 +0000</lastBuildDate>
    <atom:link href="http://localhost:1313/index.xml" rel="self" type="application/rss+xml" />
    <item>
      <title>BO-start</title>
      <link>http://localhost:1313/bo-start/</link>
      <pubDate>Mon, 07 Jul 2025 00:00:00 +0000</pubDate>
      <guid>http://localhost:1313/bo-start/</guid>
      <description>&lt;h2 id=&#34;bündnis-ost&#34;&gt;Bündnis Ost&lt;/h2&gt;&#xA;&lt;p&gt;Wir sind blablabla&lt;/p&gt;&#xA;&lt;p&gt;&amp;hellip;&lt;/p&gt;</description>
    </item>
  </channel>
</rss>
```

## public/js/app.min.052c9428dda031d011de37a333baf4b5ea65836a67284d588f1b8e33a8842e67.js

```js
class EventApp{constructor(){this.currentView="main",this.init()}init(){this.bindEvents(),this.initializeView()}bindEvents(){window.showView=this.showView.bind(this),window.showEventDetails=this.showEventDetails.bind(this);const e=document.querySelectorAll(".calendar-day");e.forEach(t=>{t.addEventListener("click",function(){e.forEach(e=>e.classList.remove("selected")),this.classList.add("selected")})}),document.addEventListener("click",e=>{e.target.classList.contains("tab")&&(e.target.parentElement.querySelectorAll(".tab").forEach(e=>{e.classList.remove("active")}),e.target.classList.add("active")),e.target.classList.contains("toggle-btn")&&(e.target.parentElement.querySelectorAll(".toggle-btn").forEach(e=>{e.classList.remove("active")}),e.target.classList.add("active"))})}initializeView(){this.showView("main")}showView(e){document.querySelectorAll('[id$="-view"]').forEach(e=>{e.classList.add("hidden")}),document.getElementById("event-details")?.classList.add("hidden");const t=document.getElementById(`${e}-view`);t&&(t.classList.remove("hidden"),this.updateNavigation(e),this.currentView=e)}showEventDetails(){document.querySelectorAll('[id$="-view"]').forEach(e=>{e.classList.add("hidden")});const e=document.getElementById("event-details");e&&e.classList.remove("hidden")}updateNavigation(e){document.querySelectorAll(".nav-item").forEach(e=>{e.classList.remove("active")});const t={main:0,events:1,calendar:2,search:0};if(t[e]!==0[0]){const n=document.querySelectorAll(".nav-item");n[t[e]]&&n[t[e]].classList.add("active")}}toggleBurgerMenu(){const e=document.getElementById("burger-overlay");e?.classList.toggle("hidden")}updateBurgerNavigation(e){document.querySelectorAll(".burger-item").forEach(e=>{e.classList.remove("active")});const t={main:0,events:1,calendar:2},n=document.querySelectorAll(".burger-item");t[e]!==0[0]&&n[t[e]]&&n[t[e]].classList.add("active")}}document.addEventListener("DOMContentLoaded",()=>{new EventApp})
```

## public/js/app.min.17ae6f21faa62fd514b32818169912e2f3dbd4b5776c6eb12af9da4a6521d810.js

```js
class EventApp{constructor(){this.currentView="main",this.isDesktop=window.innerWidth>=1024,this.init()}init(){this.bindEvents(),this.initializeView(),this.handleResize()}bindEvents(){window.showView=this.showView.bind(this),window.showEventDetails=this.showEventDetails.bind(this),window.toggleBurgerMenu=this.toggleBurgerMenu.bind(this),window.addEventListener("resize",()=>{this.handleResize()}),document.addEventListener("click",e=>{e.target.classList.contains("tab")&&(e.target.parentElement.querySelectorAll(".tab").forEach(e=>{e.classList.remove("active")}),e.target.classList.add("active")),e.target.classList.contains("toggle-btn")&&(e.target.parentElement.querySelectorAll(".toggle-btn").forEach(e=>{e.classList.remove("active")}),e.target.classList.add("active"))})}handleResize(){const e=this.isDesktop;if(this.isDesktop=window.innerWidth>=1024,e!==this.isDesktop&&this.isDesktop){const e=document.getElementById("burger-overlay");e?.classList.add("hidden")}}initializeView(){this.showView("main")}showView(e){document.querySelectorAll('[id$="-view"]').forEach(e=>{e.classList.add("hidden")}),document.getElementById("event-details")?.classList.add("hidden");const t=document.getElementById(`${e}-view`);t&&(t.classList.remove("hidden"),this.updateNavigation(e),this.currentView=e),this.updateBurgerNavigation(e),this.updateSidebarNavigation(e)}showEventDetails(){document.querySelectorAll('[id$="-view"]').forEach(e=>{e.classList.add("hidden")});const e=document.getElementById("event-details");e&&e.classList.remove("hidden")}toggleBurgerMenu(){if(!this.isDesktop){const e=document.getElementById("burger-overlay");e?.classList.toggle("hidden")}}updateNavigation(e){document.querySelectorAll(".nav-item").forEach(e=>{e.classList.remove("active")});const t={main:0,events:1,calendar:2,search:0};if(t[e]!==0[0]){const n=document.querySelectorAll(".nav-item");n[t[e]]&&n[t[e]].classList.add("active")}}updateBurgerNavigation(e){document.querySelectorAll(".burger-item").forEach(e=>{e.classList.remove("active")});const t={main:0,events:1,calendar:2},n=document.querySelectorAll(".burger-item");t[e]!==0[0]&&n[t[e]]&&n[t[e]].classList.add("active")}updateSidebarNavigation(e){document.querySelectorAll(".sidebar-item").forEach(e=>{e.classList.remove("active")});const t={main:0,events:1,calendar:2},n=document.querySelectorAll(".sidebar-item");t[e]!==0[0]&&n[t[e]]&&n[t[e]].classList.add("active")}}document.addEventListener("DOMContentLoaded",()=>{new EventApp})
```

## public/js/app.min.343859a52c750e5277abef658299d8ff846bbaf9ab3034e6551e950efaaaae0c.js

```js
class EventApp{constructor(){this.currentView="main",this.init()}init(){this.bindEvents(),this.initializeView()}bindEvents(){window.showView=this.showView.bind(this),window.showEventDetails=this.showEventDetails.bind(this);const e=document.querySelectorAll(".calendar-day");e.forEach(t=>{t.addEventListener("click",function(){e.forEach(e=>e.classList.remove("selected")),this.classList.add("selected")})}),document.addEventListener("click",e=>{e.target.classList.contains("tab")&&(e.target.parentElement.querySelectorAll(".tab").forEach(e=>{e.classList.remove("active")}),e.target.classList.add("active")),e.target.classList.contains("toggle-btn")&&(e.target.parentElement.querySelectorAll(".toggle-btn").forEach(e=>{e.classList.remove("active")}),e.target.classList.add("active"))}),window.toggleBurgerMenu=this.toggleBurgerMenu.bind(this)}initializeView(){this.showView("main")}showView(e){document.querySelectorAll('[id$="-view"]').forEach(e=>{e.classList.add("hidden")}),document.getElementById("event-details")?.classList.add("hidden");const t=document.getElementById(`${e}-view`);t&&(t.classList.remove("hidden"),this.updateNavigation(e),this.currentView=e),this.updateBurgerNavigation(e)}showEventDetails(){document.querySelectorAll('[id$="-view"]').forEach(e=>{e.classList.add("hidden")});const e=document.getElementById("event-details");e&&e.classList.remove("hidden")}updateNavigation(e){document.querySelectorAll(".nav-item").forEach(e=>{e.classList.remove("active")});const t={main:0,events:1,calendar:2,search:0};if(t[e]!==0[0]){const n=document.querySelectorAll(".nav-item");n[t[e]]&&n[t[e]].classList.add("active")}}toggleBurgerMenu(){const e=document.getElementById("burger-overlay");e?.classList.toggle("hidden")}updateBurgerNavigation(e){document.querySelectorAll(".burger-item").forEach(e=>{e.classList.remove("active")});const t={main:0,events:1,calendar:2},n=document.querySelectorAll(".burger-item");t[e]!==0[0]&&n[t[e]]&&n[t[e]].classList.add("active")}}document.addEventListener("DOMContentLoaded",()=>{new EventApp})
```

## public/js/app.min.693e4f8e6b298c5614e480d0671e09d89591b9bf05205bb5b823f0c886a5f13d.js

```js
class EventApp{constructor(){this.currentView="main",this.init()}init(){this.bindEvents(),this.initializeView()}showView(e){document.querySelectorAll('[id$="-view"]').forEach(e=>{e.classList.add("hidden")});const t=document.getElementById(`${e}-view`);t&&(t.classList.remove("hidden"),this.updateNavigation(e))}showEventDetails(){document.querySelectorAll('[id$="-view"]').forEach(e=>{e.classList.add("hidden")}),document.getElementById("event-details").classList.remove("hidden")}}document.addEventListener("DOMContentLoaded",()=>{new EventApp})
```

## public/js/app.min.aa6ac548cdc572f5c1e488f73ce5728a14a6ad3054ae031d659ea259182eae35.js

```js
class EventApp{constructor(){this.currentView="main",this.isDesktop=window.innerWidth>=1024,this.init()}init(){this.bindGlobalFunctions(),this.bindEvents(),this.showView("main")}bindGlobalFunctions(){window.showView=this.showView.bind(this),window.showEventDetails=this.showEventDetails.bind(this),window.toggleBurgerMenu=this.toggleBurgerMenu.bind(this)}bindEvents(){document.addEventListener("click",e=>{e.target.matches(".tab, .toggle-btn")&&(e.target.parentElement.querySelectorAll(".tab, .toggle-btn").forEach(e=>e.classList.remove("active")),e.target.classList.add("active"))}),window.addEventListener("resize",()=>{const e=this.isDesktop;this.isDesktop=window.innerWidth>=1024,e!==this.isDesktop&&this.isDesktop&&document.getElementById("burger-overlay")?.classList.add("hidden")})}showView(e){document.querySelectorAll('[id$="-view"], #event-details').forEach(e=>e.classList.add("hidden"));const t=document.getElementById(`${e}-view`);t&&(t.classList.remove("hidden"),this.updateNavigation(e),this.currentView=e)}showEventDetails(){document.querySelectorAll('[id$="-view"]').forEach(e=>e.classList.add("hidden")),document.getElementById("event-details")?.classList.remove("hidden")}toggleBurgerMenu(){this.isDesktop||document.getElementById("burger-overlay")?.classList.toggle("hidden")}updateNavigation(e){const n={main:0,events:1,calendar:2},t=n[e];t!==0[0]&&document.querySelectorAll(".burger-item, .sidebar-item").forEach((e,n)=>{e.classList.toggle("active",n===t)})}}document.addEventListener("DOMContentLoaded",()=>new EventApp)
```

## public/js/app.min.b5a0e8c08d1d2cda9286c0f36f9f23af422d2c047367889769e28bc10e73e548.js

```js
class EventApp{constructor(){this.currentView="main",this.init()}init(){this.bindEvents(),this.initializeView()}bindEvents(){window.showView=this.showView.bind(this),window.showEventDetails=this.showEventDetails.bind(this);const e=document.querySelectorAll(".calendar-day");e.forEach(t=>{t.addEventListener("click",function(){e.forEach(e=>e.classList.remove("selected")),this.classList.add("selected")})}),document.addEventListener("click",e=>{e.target.classList.contains("tab")&&(e.target.parentElement.querySelectorAll(".tab").forEach(e=>{e.classList.remove("active")}),e.target.classList.add("active")),e.target.classList.contains("toggle-btn")&&(e.target.parentElement.querySelectorAll(".toggle-btn").forEach(e=>{e.classList.remove("active")}),e.target.classList.add("active"))}),window.toggleBurgerMenu=this.toggleBurgerMenu.bind(this)}initializeView(){this.showView("main")}showView(e){document.querySelectorAll('[id$="-view"]').forEach(e=>{e.classList.add("hidden")}),document.getElementById("event-details")?.classList.add("hidden");const t=document.getElementById(`${e}-view`);t&&(t.classList.remove("hidden"),this.updateNavigation(e),this.currentView=e),this.updateBurgerNavigation(e),this.toggleBurgerMenu()}showEventDetails(){document.querySelectorAll('[id$="-view"]').forEach(e=>{e.classList.add("hidden")});const e=document.getElementById("event-details");e&&e.classList.remove("hidden")}updateNavigation(e){document.querySelectorAll(".nav-item").forEach(e=>{e.classList.remove("active")});const t={main:0,events:1,calendar:2,search:0};if(t[e]!==0[0]){const n=document.querySelectorAll(".nav-item");n[t[e]]&&n[t[e]].classList.add("active")}}toggleBurgerMenu(){const e=document.getElementById("burger-overlay");e?.classList.toggle("hidden")}updateBurgerNavigation(e){document.querySelectorAll(".burger-item").forEach(e=>{e.classList.remove("active")});const t={main:0,events:1,calendar:2},n=document.querySelectorAll(".burger-item");t[e]!==0[0]&&n[t[e]]&&n[t[e]].classList.add("active")}}document.addEventListener("DOMContentLoaded",()=>{new EventApp})
```

## public/js/app.min.c9102cdfa48e269869917792a840587241d95951725241b64a05ef89952eecc5.js

```js
class EventApp{constructor(){this.currentView="main",this.init()}init(){this.bindEvents(),this.initializeView()}bindEvents(){window.showView=this.showView.bind(this),window.showEventDetails=this.showEventDetails.bind(this);const e=document.querySelectorAll(".calendar-day");e.forEach(t=>{t.addEventListener("click",function(){e.forEach(e=>e.classList.remove("selected")),this.classList.add("selected")})}),document.addEventListener("click",e=>{e.target.classList.contains("tab")&&(e.target.parentElement.querySelectorAll(".tab").forEach(e=>{e.classList.remove("active")}),e.target.classList.add("active")),e.target.classList.contains("toggle-btn")&&(e.target.parentElement.querySelectorAll(".toggle-btn").forEach(e=>{e.classList.remove("active")}),e.target.classList.add("active"))})}initializeView(){this.showView("main")}showView(e){document.querySelectorAll('[id$="-view"]').forEach(e=>{e.classList.add("hidden")}),document.getElementById("event-details")?.classList.add("hidden");const t=document.getElementById(`${e}-view`);t&&(t.classList.remove("hidden"),this.updateNavigation(e),this.currentView=e)}showEventDetails(){document.querySelectorAll('[id$="-view"]').forEach(e=>{e.classList.add("hidden")});const e=document.getElementById("event-details");e&&e.classList.remove("hidden")}updateNavigation(e){document.querySelectorAll(".nav-item").forEach(e=>{e.classList.remove("active")});const t={main:0,events:1,calendar:2,search:0};if(t[e]!==0[0]){const n=document.querySelectorAll(".nav-item");n[t[e]]&&n[t[e]].classList.add("active")}}}document.addEventListener("DOMContentLoaded",()=>{new EventApp})
```

## public/js/app.min.fe09cc628202d29f79732fb859617ebad27fe56f1216eb650dddd7d2b8281b24.js

```js
class EventApp{constructor(){this.currentView="main",this.init()}init(){this.bindEvents(),this.initializeView()}bindEvents(){window.showView=this.showView.bind(this),window.showEventDetails=this.showEventDetails.bind(this);const e=document.querySelectorAll(".calendar-day");e.forEach(t=>{t.addEventListener("click",function(){e.forEach(e=>e.classList.remove("selected")),this.classList.add("selected")})}),document.addEventListener("click",e=>{e.target.classList.contains("tab")&&(e.target.parentElement.querySelectorAll(".tab").forEach(e=>{e.classList.remove("active")}),e.target.classList.add("active")),e.target.classList.contains("toggle-btn")&&(e.target.parentElement.querySelectorAll(".toggle-btn").forEach(e=>{e.classList.remove("active")}),e.target.classList.add("active"))}),window.toggleBurgerMenu=this.toggleBurgerMenu.bind(this)}initializeView(){this.showView("main")}showView(e){document.querySelectorAll('[id$="-view"]').forEach(e=>{e.classList.add("hidden")}),document.getElementById("event-details")?.classList.add("hidden");const t=document.getElementById(`${e}-view`);t&&(t.classList.remove("hidden"),this.updateNavigation(e),this.currentView=e)}showEventDetails(){document.querySelectorAll('[id$="-view"]').forEach(e=>{e.classList.add("hidden")});const e=document.getElementById("event-details");e&&e.classList.remove("hidden")}updateNavigation(e){document.querySelectorAll(".nav-item").forEach(e=>{e.classList.remove("active")});const t={main:0,events:1,calendar:2,search:0};if(t[e]!==0[0]){const n=document.querySelectorAll(".nav-item");n[t[e]]&&n[t[e]].classList.add("active")}}toggleBurgerMenu(){const e=document.getElementById("burger-overlay");e?.classList.toggle("hidden")}updateBurgerNavigation(e){document.querySelectorAll(".burger-item").forEach(e=>{e.classList.remove("active")});const t={main:0,events:1,calendar:2},n=document.querySelectorAll(".burger-item");t[e]!==0[0]&&n[t[e]]&&n[t[e]].classList.add("active")}}document.addEventListener("DOMContentLoaded",()=>{new EventApp})
```

## public/sitemap.xml

```xml
<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>http://localhost:1313/bo-start/</loc>
    <lastmod>2025-07-07T00:00:00+00:00</lastmod>
  </url><url>
    <loc>http://localhost:1313/</loc>
    <lastmod>2025-07-07T00:00:00+00:00</lastmod>
  </url><url>
    <loc>http://localhost:1313/categories/</loc>
  </url><url>
    <loc>http://localhost:1313/tags/</loc>
  </url>
</urlset>
```

## public/tags/index.html

```html
<!DOCTYPE html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tags</title>
<link rel="stylesheet" href="/css/main.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">

</head>
<body>
  <header class="site-header">
  <div class="container">
    <h1 class="logo"><a href="/">🌻 GRÜNE IDEEN</a></h1>
    <nav>
      <ul>
        <li><a href="/">Start</a></li>
        <li><a href="/themen/">Themen</a></li>
      </ul>
    </nav>
  </div>
</header>

  <main class="container">
    
  <section class="p-4">
    
  </section>

  </main>
  <footer class="site-footer">
  <div class="container">
    <p>&copy; 2025 Bündnis Ost</p>
  </div>
</footer>

</body>
</html>
```

## public/tags/index.xml

```xml
<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Tags on Bündnis Ost</title>
    <link>http://localhost:1313/tags/</link>
    <description>Recent content in Tags on Bündnis Ost</description>
    <generator>Hugo</generator>
    <language>de-de</language>
    <atom:link href="http://localhost:1313/tags/index.xml" rel="self" type="application/rss+xml" />
  </channel>
</rss>
```

## public/tags/page/1/index.html

```html
<!DOCTYPE html>
<html lang="de-de">
  <head>
    <title>http://localhost:1313/tags/</title>
    <link rel="canonical" href="http://localhost:1313/tags/">
    <meta name="robots" content="noindex">
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0; url=http://localhost:1313/tags/">
  </head>
</html>
```

## resources/_gen/assets/css/app.css_13f1199f9eae090fefa7a528a41e4498.json

```json
{"Target":"/css/app.min.21a64576266d81eb4e990104e88fecd2fed10cb7a3f38b0a7190a3d5000b8197.css","MediaType":"text/css","Data":{"Integrity":"sha256-IaZFdiZtgetOmQEE6I/s0v7RDLej84sKcZCj1QALgZc="}}
```

## resources/_gen/assets/css/app.css_5d1ae7b26729580b7c0ef1c83fb083f3.json

```json
{"Target":"/css/app.min.15276f049e4d4c5994584f49b3a2ce3f80842c8ebbddb1ec0889b0854701be0a.css","MediaType":"text/css","Data":{"Integrity":"sha256-FSdvBJ5NTFmUWE9Js6LOP4CELI673bHsCImwhUcBvgo="}}
```

## static/css/main.css

```css
body {
  font-family: 'Open Sans', sans-serif;
  margin: 0;
  background-color: #ffffff;
  color: #222;
}

.container {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
}

.site-header {
  background-color: #64A12D; /* GRÜN */
  color: white;
  padding: 1rem 0;
}

.site-header .logo {
  margin: 0;
  font-weight: bold;
}

.site-header a {
  color: white;
  text-decoration: none;
  font-weight: 600;
}

.site-header nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1rem;
}

.hero {
  padding: 2rem 0;
  background: #f0f9eb;
  border-bottom: 2px solid #64A12D;
}

h1, h2 {
  color: #64A12D;
}

.site-footer {
  background: #eeeeee;
  padding: 1rem 0;
  text-align: center;
  margin-top: 2rem;
  font-size: 0.9rem;
}
```

