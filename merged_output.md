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
<!doctype html>
<html lang="de">
<head>
  {{ partial "head.html" . }}
</head>
<body>
  <div class="app-container">
    {{ block "main" . }}{{ end }}
  </div>
  {{ partial "scripts.html" . }}
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
  <article class="p-4 prose">
    {{ .Content }}
  </article>
{{ end }}
```

## layouts/index.html

```html
{{ define "main" }}
<!-- Desktop Sidebar (nur auf Desktop sichtbar) -->
<div class="desktop-sidebar">
    <div class="sidebar-nav">
        <a href="#" class="sidebar-item active" onclick="showView('main')">
            <span class="sidebar-icon">🔍</span>
            <span>Startseite</span>
        </a>
        <a href="#" class="sidebar-item" onclick="showView('events')">
            <span class="sidebar-icon">📅</span>
            <span>Veranstaltungen</span>
        </a>
        <a href="#" class="sidebar-item" onclick="showView('calendar')">
            <span class="sidebar-icon">🗺️</span>
            <span>Karte</span>
        </a>
        <a href="#" class="sidebar-item">
            <span class="sidebar-icon">👤</span>
            <span>Geschichten</span>
        </a>
    </div>
</div>

<!-- Main Content Area -->
<div class="main-content">
    <!-- Main Events View -->
    <div id="main-view">
        <div class="header">
            <span class="page-title">Startseite</span>
            <button class="burger-menu" onclick="toggleBurgerMenu()">☰</button>
        </div>
        
        <!-- Mobile Burger Menu -->
        <div id="burger-overlay" class="burger-overlay hidden">
            <div class="burger-content">
                <div class="burger-header">
                    <span class="burger-title">Menü</span>
                    <button class="burger-close" onclick="toggleBurgerMenu()">×</button>
                </div>
                <nav class="burger-nav">
                    <a href="#" class="burger-item active" onclick="showView('main'); toggleBurgerMenu();">
                        <span class="burger-icon">🔍</span>
                        <span>Startseite</span>
                    </a>
                    <a href="#" class="burger-item" onclick="showView('events'); toggleBurgerMenu();">
                        <span class="burger-icon">📅</span>
                        <span>Veranstaltungen</span>
                    </a>
                    <a href="#" class="burger-item" onclick="showView('calendar'); toggleBurgerMenu();">
                        <span class="burger-icon">🗺️</span>
                        <span>Karte</span>
                    </a>
                    <a href="#" class="burger-item" onclick="showView('stories'); toggleBurgerMenu();">
                        <span class="burger-icon">👤</span>
                        <span>Geschichten</span>
                    </a>
                </nav>
            </div>
        </div>
        
        <div class="content">
            <div class="section-header">
                <h2 class="section-title">Aktuelle Veranstaltungen</h2>
                <a href="#" class="section-link" onclick="showView('search')">Alle ansehen ▶</a>
            </div>

            <div class="events-grid">
                {{ range first 6 (where site.RegularPages "Section" "events") }}
                    {{ partial "event-card.html" . }}
                {{ end }}
            </div>

            <div class="cta-section">
                <h2 class="cta-title">Mach mit!</h2>
                <p class="cta-subtitle">Jetzt deine Veranstaltung eintragen.</p>
                <button class="cta-btn" onclick="alert('Event eintragen')">EINTRAGEN</button>
            </div>
        </div>
    </div>

    <!-- Search Results View -->
    <div id="search-view" class="hidden">
        <div class="header">
            <button class="back-btn" onclick="showView('main')">←</button>
            <span class="page-title">Suchergebnisse</span>
            <button class="burger-menu" onclick="toggleBurgerMenu()">☰</button>
        </div>
        
        <div class="content">
            <input type="text" class="search-bar" placeholder="Suche">
            <div class="event-list-grid">
                {{ range where site.RegularPages "Section" "events" }}
                    {{ partial "event-list-item.html" . }}
                {{ end }}
            </div>
        </div>
    </div>

    <!-- Calendar View -->
    <div id="calendar-view" class="hidden">
        <div class="header">
            <button class="back-btn" onclick="showView('main')">←</button>
            <span class="page-title">Unser Kalender</span>
            <button class="burger-menu" onclick="toggleBurgerMenu()">☰</button>
        </div>
        
        <div class="content">
            <div class="view-toggle">
                <button class="toggle-btn active">Kartenansicht</button>
                <button class="toggle-btn">Kalenderansicht</button>
            </div>

            <div class="tabs">
                <button class="tab active">Ostdeutschland</button>
                <button class="tab">Berlin</button>
                <button class="tab">Brandenburg</button>
                <button class="tab">Mecklenburg-Vorpommern</button>
                <button class="tab">Sachsen</button>
                <button class="tab">Sachsen-Anhalt</button>
                <button class="tab">Thüringen</button>
            </div>

            <div class="map-container">
                <div class="map-marker marker-1">🎵</div>
                <div class="map-marker marker-2">⚡</div>
                <div class="map-marker marker-3">✈️</div>
            </div>
        </div>
    </div>

    <!-- Event Details View -->
    <div id="event-details" class="hidden">
        {{ with (index (where site.RegularPages "Section" "events") 0) }}
        <div class="event-header-image">
            <button class="back-btn" onclick="showView('main')" style="position: absolute; top: 20px; left: 20px; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer;">←</button>
            <button class="bookmark-btn" style="top: 20px; right: 20px;">🔖</button>
            
            <div class="event-actions">
                <button class="action-btn map-btn">📍 Auf Karte öffnen</button>
                <button class="action-btn join-btn">Ich bin dabei!</button>
            </div>
        </div>

        <div class="event-meta">
            <h1 class="event-meta-title">{{ .Title }}</h1>
            
            <div class="meta-item">
                <div class="meta-icon date-icon">📅</div>
                <div class="meta-text">
                    <h4>{{ .Date.Format "02.01.2006" }}</h4>
                    <p>{{ .Date.Format "Monday, 15:04" }} bis {{ .Params.endTime }} Uhr</p>
                </div>
            </div>

            <div class="meta-item">
                <div class="meta-icon location-icon">📍</div>
                <div class="meta-text">
                    <h4>{{ .Params.location }}</h4>
                    <p>{{ .Params.address }}</p>
                </div>
            </div>

            <div class="meta-item">
                <div class="meta-icon organizer-icon">👤</div>
                <div class="meta-text">
                    <h4>{{ .Params.organizer }}</h4>
                    <p>Organizer</p>
                </div>
                <button class="contact-btn">Kontakt</button>
            </div>

            <div class="description">
                <h3>Beschreibung</h3>
                <p>{{ .Content }}</p>
            </div>
        </div>
        {{ end }}
    </div>

    <!-- Events List View -->
    <div id="events-view" class="hidden">
        <div class="header">
            <button class="back-btn" onclick="showView('main')">←</button>
            <span class="page-title">Veranstaltungen</span>
            <button class="burger-menu" onclick="toggleBurgerMenu()">☰</button>
        </div>
        
        <div class="content">
            <div class="tabs">
                <button class="tab active">Kommende Veranstaltungen</button>
                <button class="tab">Veranstaltung eintragen</button>
            </div>

            {{ $events := where site.RegularPages "Section" "events" }}
            {{ if $events }}
                <div class="event-list-grid">
                    {{ range $events }}
                        {{ partial "event-list-item.html" . }}
                    {{ end }}
                </div>
            {{ else }}
                <div class="no-events">
                    <div class="no-events-icon">📅</div>
                    <h3>Keine Veranstaltungen</h3>
                    <p style="color: #666; margin-top: 8px;">Aktuell finden keine Events statt.</p>
                    <button class="cta-btn" style="margin-top: 20px;" onclick="showView('main')">EXPLORE EVENTS</button>
                </div>
            {{ end }}
        </div>
    </div>
</div>

<!-- Floating Action Button -->
<button class="floating-btn" onclick="alert('Event erstellen')">+</button>
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

## layouts/partials/head.html

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{ if .Title }}{{ .Title }} | {{ end }}{{ site.Title }}</title>

{{ $css := resources.Get "css/app.css" | css.PostCSS | resources.Minify | resources.Fingerprint }}
<link rel="stylesheet" href="{{ $css.RelPermalink }}">
```

## layouts/partials/header.html

```html
<header class="p-4 text-xl font-bold">{{ .Title }}</header>
```

## layouts/partials/scripts.html

```html
{{ $js := resources.Get "js/app.js" | resources.Minify | resources.Fingerprint }}
<script src="{{ $js.RelPermalink }}"></script>
```

## merged_output.md

```md
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
<!doctype html>
<html lang="de">
<head>
  {{ partial "head.html" . }}
</head>
<body>
  <div class="app-container">
    {{ block "main" . }}{{ end }}
  </div>
  {{ partial "scripts.html" . }}
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
  <article class="p-4 prose">
    {{ .Content }}
  </article>
{{ end }}
```

## layouts/index.html

```html
{{ define "main" }}
<!-- Desktop Sidebar (nur auf Desktop sichtbar) -->
<div class="desktop-sidebar">
    <div class="sidebar-nav">
        <a href="#" class="sidebar-item active" onclick="showView('main')">
            <span class="sidebar-icon">🔍</span>
            <span>Startseite</span>
        </a>
        <a href="#" class="sidebar-item" onclick="showView('events')">
            <span class="sidebar-icon">📅</span>
            <span>Veranstaltungen</span>
        </a>
        <a href="#" class="sidebar-item" onclick="showView('calendar')">
            <span class="sidebar-icon">🗺️</span>
            <span>Karte</span>
        </a>
        <a href="#" class="sidebar-item">
            <span class="sidebar-icon">👤</span>
            <span>Geschichten</span>
        </a>
    </div>
</div>

<!-- Main Content Area -->
<div class="main-content">
    <!-- Main Events View -->
    <div id="main-view">
        <div class="header">
            <span class="page-title">Startseite</span>
            <button class="burger-menu" onclick="toggleBurgerMenu()">☰</button>
        </div>
        
        <!-- Mobile Burger Menu -->
        <div id="burger-overlay" class="burger-overlay hidden">
            <div class="burger-content">
                <div class="burger-header">
                    <span class="burger-title">Menü</span>
                    <button class="burger-close" onclick="toggleBurgerMenu()">×</button>
                </div>
                <nav class="burger-nav">
                    <a href="#" class="burger-item active" onclick="showView('main'); toggleBurgerMenu();">
                        <span class="burger-icon">🔍</span>
                        <span>Startseite</span>
                    </a>
                    <a href="#" class="burger-item" onclick="showView('events'); toggleBurgerMenu();">
                        <span class="burger-icon">📅</span>
                        <span>Veranstaltungen</span>
                    </a>
                    <a href="#" class="burger-item" onclick="showView('calendar'); toggleBurgerMenu();">
                        <span class="burger-icon">🗺️</span>
                        <span>Karte</span>
                    </a>
                    <a href="#" class="burger-item" onclick="showView('stories'); toggleBurgerMenu();">
                        <span class="burger-icon">👤</span>
                        <span>Geschichten</span>
                    </a>
                </nav>
            </div>
        </div>
        
        <div class="content">
            <div class="section-header">
                <h2 class="section-title">Aktuelle Veranstaltungen</h2>
                <a href="#" class="section-link" onclick="showView('search')">Alle ansehen ▶</a>
            </div>

            <div class="events-grid">
                {{ range first 6 (where site.RegularPages "Section" "events") }}
                    {{ partial "event-card.html" . }}
                {{ end }}
            </div>

            <div class="cta-section">
                <h2 class="cta-title">Mach mit!</h2>
                <p class="cta-subtitle">Jetzt deine Veranstaltung eintragen.</p>
                <button class="cta-btn" onclick="alert('Event eintragen')">EINTRAGEN</button>
            </div>
        </div>
    </div>

    <!-- Search Results View -->
    <div id="search-view" class="hidden">
        <div class="header">
            <button class="back-btn" onclick="showView('main')">←</button>
            <span class="page-title">Suchergebnisse</span>
            <button class="burger-menu" onclick="toggleBurgerMenu()">☰</button>
        </div>
        
        <div class="content">
            <input type="text" class="search-bar" placeholder="Suche">
            <div class="event-list-grid">
                {{ range where site.RegularPages "Section" "events" }}
                    {{ partial "event-list-item.html" . }}
                {{ end }}
            </div>
        </div>
    </div>

    <!-- Calendar View -->
    <div id="calendar-view" class="hidden">
        <div class="header">
            <button class="back-btn" onclick="showView('main')">←</button>
            <span class="page-title">Unser Kalender</span>
            <button class="burger-menu" onclick="toggleBurgerMenu()">☰</button>
        </div>
        
        <div class="content">
            <div class="view-toggle">
                <button class="toggle-btn active">Kartenansicht</button>
                <button class="toggle-btn">Kalenderansicht</button>
            </div>

            <div class="tabs">
                <button class="tab active">Ostdeutschland</button>
                <button class="tab">Berlin</button>
                <button class="tab">Brandenburg</button>
                <button class="tab">Mecklenburg-Vorpommern</button>
                <button class="tab">Sachsen</button>
                <button class="tab">Sachsen-Anhalt</button>
                <button class="tab">Thüringen</button>
            </div>

            <div class="map-container">
                <div class="map-marker marker-1">🎵</div>
                <div class="map-marker marker-2">⚡</div>
                <div class="map-marker marker-3">✈️</div>
            </div>
        </div>
    </div>

    <!-- Event Details View -->
    <div id="event-details" class="hidden">
        {{ with (index (where site.RegularPages "Section" "events") 0) }}
        <div class="event-header-image">
            <button class="back-btn" onclick="showView('main')" style="position: absolute; top: 20px; left: 20px; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer;">←</button>
            <button class="bookmark-btn" style="top: 20px; right: 20px;">🔖</button>
            
            <div class="event-actions">
                <button class="action-btn map-btn">📍 Auf Karte öffnen</button>
                <button class="action-btn join-btn">Ich bin dabei!</button>
            </div>
        </div>

        <div class="event-meta">
            <h1 class="event-meta-title">{{ .Title }}</h1>
            
            <div class="meta-item">
                <div class="meta-icon date-icon">📅</div>
                <div class="meta-text">
                    <h4>{{ .Date.Format "02.01.2006" }}</h4>
                    <p>{{ .Date.Format "Monday, 15:04" }} bis {{ .Params.endTime }} Uhr</p>
                </div>
            </div>

            <div class="meta-item">
                <div class="meta-icon location-icon">📍</div>
                <div class="meta-text">
                    <h4>{{ .Params.location }}</h4>
                    <p>{{ .Params.address }}</p>
                </div>
            </div>

            <div class="meta-item">
                <div class="meta-icon organizer-icon">👤</div>
                <div class="meta-text">
                    <h4>{{ .Params.organizer }}</h4>
                    <p>Organizer</p>
                </div>
                <button class="contact-btn">Kontakt</button>
            </div>

            <div class="description">
                <h3>Beschreibung</h3>
                <p>{{ .Content }}</p>
            </div>
        </div>
        {{ end }}
    </div>

    <!-- Events List View -->
    <div id="events-view" class="hidden">
        <div class="header">
            <button class="back-btn" onclick="showView('main')">←</button>
            <span class="page-title">Veranstaltungen</span>
            <button class="burger-menu" onclick="toggleBurgerMenu()">☰</button>
        </div>
        
        <div class="content">
            <div class="tabs">
                <button class="tab active">Kommende Veranstaltungen</button>
                <button class="tab">Veranstaltung eintragen</button>
            </div>

            {{ $events := where site.RegularPages "Section" "events" }}
            {{ if $events }}
                <div class="event-list-grid">
                    {{ range $events }}
                        {{ partial "event-list-item.html" . }}
                    {{ end }}
                </div>
            {{ else }}
                <div class="no-events">
                    <div class="no-events-icon">📅</div>
                    <h3>Keine Veranstaltungen</h3>
                    <p style="color: #666; margin-top: 8px;">Aktuell finden keine Events statt.</p>
                    <button class="cta-btn" style="margin-top: 20px;" onclick="showView('main')">EXPLORE EVENTS</button>
                </div>
            {{ end }}
        </div>
    </div>
</div>

<!-- Floating Action Button -->
<button class="floating-btn" onclick="alert('Event erstellen')">+</button>
{{ end }}
```

## public/categories/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Categories | Bündnis Ost</title>


<link rel="stylesheet" href="/css/app.min.15276f049e4d4c5994584f49b3a2ce3f80842c8ebbddb1ec0889b0854701be0a.css">
</head>
<body>
  <div class="app-container">
    
  <section class="p-4">
    
  </section>

  </div>
  
<script src="/js/app.min.aa6ac548cdc572f5c1e488f73ce5728a14a6ad3054ae031d659ea259182eae35.js"></script>
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

## public/css/app.min.aa2faa63a11158eaac55d961c24dc46d6f694d9792e45b147a94c745b586a784.css

```css
:root{--primary:#5b6cf2;--secondary:#00bcd4;--accent:#ff6b35;--text:#333;--text-light:#666;--bg:#f8f9fa;--white:#fff;--border:#eee;--shadow:0 2px 8px rgba(0,0,0,0.1);--radius:12px;--spacing:20px}[data-theme=dark]{--bg:#121212;--white:#1e1e1e;--text:#e0e0e0;--text-light:#9e9e9e;--border:#2c2c2c;--shadow:0 2px 8px rgba(0,0,0,.6);--primary:#8ab4f8;--secondary:#00acc1;--accent:#ff8a50}*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,sans-serif;background:var(--bg);color:var(--text)}.app-container{max-width:400px;margin:0 auto;background:var(--white);min-height:100vh;box-shadow:var(--shadow)}.header{background:var(--white);padding:15px var(--spacing);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}.page-title{font-size:20px;font-weight:600}.back-btn,.burger-menu{background:0 0;border:none;font-size:24px;cursor:pointer;padding:5px}.content{padding:var(--spacing)}.hidden{display:none !important}.events-grid{display:grid;gap:16px;margin-bottom:20px}.event-card{background:var(--white);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);cursor:pointer;transition:transform .2s}.event-card:hover{transform:translateY(-2px)}.event-image{width:100%;height:180px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative}.event-card[data-category=be] .event-image,.event-list-image[data-category=be]{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.event-card[data-category=bb] .event-image,.event-list-image[data-category=bb]{background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)}.event-card[data-category=mv] .event-image,.event-list-image[data-category=mv]{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.event-card[data-category=sn] .event-image,.event-list-image[data-category=sn]{background:linear-gradient(135deg,#8e44ad 0%,#3498db 100%)}.event-card[data-category=st] .event-image,.event-list-image[data-category=st]{background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)}.event-card[data-category=th] .event-image,.event-list-image[data-category=th]{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)}.date-badge{position:absolute;top:16px;left:16px;background:var(--accent);color:var(--white);padding:8px 12px;border-radius:8px;font-weight:600;text-align:center}.date-badge .day{font-size:20px;line-height:1}.date-badge .month{font-size:12px;text-transform:uppercase}.bookmark-btn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.9);border:none;width:40px;height:40px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}.event-info{padding:var(--spacing)}.event-title{font-size:18px;font-weight:600;margin-bottom:8px;line-height:1.3}.event-location{color:var(--text-light);font-size:14px;display:flex;align-items:center;gap:6px}.event-list-item{display:flex;align-items:center;padding:16px;margin-bottom:12px;background:var(--white);border-radius:var(--radius);box-shadow:var(--shadow);cursor:pointer}.event-list-image{width:60px;height:60px;border-radius:8px;margin-right:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.event-list-info h4{font-size:16px;font-weight:600;margin-bottom:4px}.event-list-date{color:var(--primary);font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:2px}.cta-section{background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);margin:var(--spacing)calc(-1 * var(--spacing));padding:30px var(--spacing);text-align:center}.cta-title{font-size:32px;font-weight:700;color:#1976d2;margin-bottom:8px}.cta-subtitle{color:var(--text-light);margin-bottom:24px}.cta-btn{background:var(--secondary);color:var(--white);border:none;padding:16px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s}.cta-btn:hover{background:#00acc1}.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;justify-content:flex-end}.burger-content{background:var(--white);width:280px;height:100vh;box-shadow:-2px 0 10px rgba(0,0,0,.1);animation:slideIn .3s ease-out}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}.burger-header{padding:var(--spacing);border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center}.burger-title{font-size:20px;font-weight:600}.burger-close{background:0 0;border:none;font-size:30px;cursor:pointer;color:var(--text-light)}.burger-item{display:flex;align-items:center;gap:16px;padding:16px var(--spacing);color:var(--text);text-decoration:none;font-size:16px;font-weight:500;transition:background .2s}.burger-item:hover{background:#f5f5f5}.burger-item.active{background:#e3f2fd;color:#1976d2}.burger-icon{font-size:20px;width:24px;text-align:center}.event-header-image{width:100%;height:250px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative}.event-actions{position:absolute;bottom:var(--spacing);left:var(--spacing);right:var(--spacing);display:flex;gap:12px}.action-btn{flex:1;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer}.map-btn{background:var(--white);color:var(--text)}.join-btn{background:var(--primary);color:var(--white)}.event-meta{padding:var(--spacing)}.event-meta-title{font-size:24px;font-weight:700;margin-bottom:var(--spacing)}.meta-item{display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:12px 0}.meta-icon{width:48px;height:48px;border-radius:var(--radius);display:flex;align-items:center;justify-content:center;font-size:20px}.date-icon{background:#fff3e0;color:#f57c00}.location-icon{background:#e8f5e8;color:#4caf50}.organizer-icon{background:#f3e5f5;color:#9c27b0}.meta-text h4{font-size:16px;font-weight:600;margin-bottom:4px}.meta-text p{color:var(--text-light);font-size:14px}.contact-btn{background:#e3f2fd;color:#1976d2;border:none;padding:8px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer}.description{margin-top:var(--spacing)}.description h3{font-size:18px;font-weight:600;margin-bottom:12px}.tabs,.view-toggle{display:flex;gap:8px;margin-bottom:var(--spacing)}.view-toggle{background:#f0f0f0;border-radius:24px;padding:4px}.tab,.toggle-btn{padding:8px 16px;border:none;border-radius:20px;background:#f5f5f5;color:var(--text-light);cursor:pointer;font-size:14px}.toggle-btn{flex:1;background:0 0}.tab.active,.toggle-btn.active{background:var(--primary);color:var(--white)}.toggle-btn.active{background:var(--white);color:var(--primary);box-shadow:var(--shadow)}.search-bar{background:#f5f5f5;border:none;padding:12px 16px;border-radius:24px;width:100%;margin-bottom:var(--spacing);font-size:16px}.map-container{width:100%;height:300px;background:linear-gradient(45deg,#e8f5e8,#f0f8ff);border-radius:var(--radius);position:relative;overflow:hidden}.map-marker{position:absolute;width:30px;height:30px;background:var(--primary);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--white);font-size:16px;cursor:pointer;animation:pulse 2s infinite}@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}.marker-1{top:50px;left:100px}.marker-2{top:120px;left:200px}.marker-3{top:180px;left:150px}.floating-btn{position:fixed;bottom:var(--spacing);right:var(--spacing);width:56px;height:56px;background:var(--primary);border:none;border-radius:50%;color:var(--white);font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(91,108,242,.4)}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--spacing)}.section-title{font-size:24px;font-weight:700}.section-link{color:var(--primary);text-decoration:none;font-size:14px;font-weight:500}@media(min-width:768px){.app-container{max-width:768px}.content{padding:30px}.section-title{font-size:28px}.cta-title{font-size:36px}}@media(min-width:1024px){.app-container{max-width:1200px;display:grid;grid-template-columns:280px 1fr;box-shadow:0 0 30px rgba(0,0,0,.1)}.desktop-sidebar{background:var(--bg);border-right:1px solid var(--border);padding:var(--spacing)0;position:sticky;top:0;height:100vh;overflow-y:auto}.sidebar-item{display:flex;align-items:center;gap:16px;padding:16px var(--spacing);color:var(--text);text-decoration:none;font-size:16px;font-weight:500;transition:background .2s;cursor:pointer}.sidebar-item:hover{background:#f0f0f0}.sidebar-item.active{background:#e3f2fd;color:#1976d2;border-right:3px solid #1976d2}.sidebar-icon{font-size:20px;width:24px;text-align:center}.main-content{background:var(--white);min-height:100vh}.burger-menu,.burger-overlay{display:none}.header{padding:var(--spacing)30px;border-bottom:1px solid var(--border)}.page-title{font-size:24px}.events-grid{grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:var(--spacing)}.cta-section{margin:30px -30px;padding:40px 30px}.cta-title{font-size:40px}.floating-btn{bottom:30px;right:30px;width:64px;height:64px;font-size:28px}.event-list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px}.map-container{height:400px}.search-bar{max-width:400px;margin:0 auto 30px}}@media(min-width:1440px){.app-container{max-width:1400px}.events-grid{grid-template-columns:repeat(3,1fr)}.content{padding:40px}.cta-section{margin:40px -40px;padding:50px 40px}}
```

## public/events/2025_csd_berlin/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Berlin 2025 | Bündnis Ost</title>


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

## public/events/2025_csd_dresden/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Dresden 2025 | Bündnis Ost</title>


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

## public/events/2025_csd_leipzig/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Leipzig 2025 | Bündnis Ost</title>


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

## public/events/2025_csd_potsdam/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Potsdam 2025 | Bündnis Ost</title>


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

## public/events/2025_csd_rostock/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Rostock 2025 | Bündnis Ost</title>


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

## public/events/2025_csd_schwerin/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSD Schwerin 2025 | Bündnis Ost</title>


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

## public/events/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Events | Bündnis Ost</title>


<link rel="stylesheet" href="/css/app.min.15276f049e4d4c5994584f49b3a2ce3f80842c8ebbddb1ec0889b0854701be0a.css">
</head>
<body>
  <div class="app-container">
    
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

  </div>
  
<script src="/js/app.min.aa6ac548cdc572f5c1e488f73ce5728a14a6ad3054ae031d659ea259182eae35.js"></script>
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

## public/index.html

```html
<!doctype html>
<html lang="de">
<head>
	<meta name="generator" content="Hugo 0.148.2"><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bündnis Ost | Bündnis Ost</title>


<link rel="stylesheet" href="/css/app.min.15276f049e4d4c5994584f49b3a2ce3f80842c8ebbddb1ec0889b0854701be0a.css">
</head>
<body>
  <div class="app-container">
    

<div class="desktop-sidebar">
    <div class="sidebar-nav">
        <a href="#" class="sidebar-item active" onclick="showView('main')">
            <span class="sidebar-icon">🔍</span>
            <span>Startseite</span>
        </a>
        <a href="#" class="sidebar-item" onclick="showView('events')">
            <span class="sidebar-icon">📅</span>
            <span>Veranstaltungen</span>
        </a>
        <a href="#" class="sidebar-item" onclick="showView('calendar')">
            <span class="sidebar-icon">🗺️</span>
            <span>Karte</span>
        </a>
        <a href="#" class="sidebar-item">
            <span class="sidebar-icon">👤</span>
            <span>Geschichten</span>
        </a>
    </div>
</div>


<div class="main-content">
    
    <div id="main-view">
        <div class="header">
            <span class="page-title">Startseite</span>
            <button class="burger-menu" onclick="toggleBurgerMenu()">☰</button>
        </div>
        
        
        <div id="burger-overlay" class="burger-overlay hidden">
            <div class="burger-content">
                <div class="burger-header">
                    <span class="burger-title">Menü</span>
                    <button class="burger-close" onclick="toggleBurgerMenu()">×</button>
                </div>
                <nav class="burger-nav">
                    <a href="#" class="burger-item active" onclick="showView('main'); toggleBurgerMenu();">
                        <span class="burger-icon">🔍</span>
                        <span>Startseite</span>
                    </a>
                    <a href="#" class="burger-item" onclick="showView('events'); toggleBurgerMenu();">
                        <span class="burger-icon">📅</span>
                        <span>Veranstaltungen</span>
                    </a>
                    <a href="#" class="burger-item" onclick="showView('calendar'); toggleBurgerMenu();">
                        <span class="burger-icon">🗺️</span>
                        <span>Karte</span>
                    </a>
                    <a href="#" class="burger-item" onclick="showView('stories'); toggleBurgerMenu();">
                        <span class="burger-icon">👤</span>
                        <span>Geschichten</span>
                    </a>
                </nav>
            </div>
        </div>
        
        <div class="content">
            <div class="section-header">
                <h2 class="section-title">Aktuelle Veranstaltungen</h2>
                <a href="#" class="section-link" onclick="showView('search')">Alle ansehen ▶</a>
            </div>

            <div class="events-grid">
                
                    <div class="event-card" data-category="be" onclick="showEventDetails()">
    <div class="event-image">
        <div class="date-badge">
            <div class="day">26</div>
            <div class="month">JUL</div>
        </div>
        <button class="bookmark-btn">薄</button>
    </div>
    <div class="event-info">
        <h3 class="event-title">CSD Berlin 2025</h3>
        <div class="event-location">桃 Berlin</div>
    </div>
</div>
                
                    <div class="event-card" data-category="mv" onclick="showEventDetails()">
    <div class="event-image">
        <div class="date-badge">
            <div class="day">19</div>
            <div class="month">JUL</div>
        </div>
        <button class="bookmark-btn">薄</button>
    </div>
    <div class="event-info">
        <h3 class="event-title">CSD Rostock 2025</h3>
        <div class="event-location">桃 Rostock</div>
    </div>
</div>
                
                    <div class="event-card" data-category="sn" onclick="showEventDetails()">
    <div class="event-image">
        <div class="date-badge">
            <div class="day">28</div>
            <div class="month">JUN</div>
        </div>
        <button class="bookmark-btn">薄</button>
    </div>
    <div class="event-info">
        <h3 class="event-title">CSD Leipzig 2025</h3>
        <div class="event-location">桃 Leipzig</div>
    </div>
</div>
                
                    <div class="event-card" data-category="mv" onclick="showEventDetails()">
    <div class="event-image">
        <div class="date-badge">
            <div class="day">07</div>
            <div class="month">JUN</div>
        </div>
        <button class="bookmark-btn">薄</button>
    </div>
    <div class="event-info">
        <h3 class="event-title">CSD Schwerin 2025</h3>
        <div class="event-location">桃 Schwerin</div>
    </div>
</div>
                
                    <div class="event-card" data-category="sn" onclick="showEventDetails()">
    <div class="event-image">
        <div class="date-badge">
            <div class="day">31</div>
            <div class="month">MAY</div>
        </div>
        <button class="bookmark-btn">薄</button>
    </div>
    <div class="event-info">
        <h3 class="event-title">CSD Dresden 2025</h3>
        <div class="event-location">桃 Dresden</div>
    </div>
</div>
                
                    <div class="event-card" data-category="bb" onclick="showEventDetails()">
    <div class="event-image">
        <div class="date-badge">
            <div class="day">17</div>
            <div class="month">MAY</div>
        </div>
        <button class="bookmark-btn">薄</button>
    </div>
    <div class="event-info">
        <h3 class="event-title">CSD Potsdam 2025</h3>
        <div class="event-location">桃 Potsdam</div>
    </div>
</div>
                
            </div>

            <div class="cta-section">
                <h2 class="cta-title">Mach mit!</h2>
                <p class="cta-subtitle">Jetzt deine Veranstaltung eintragen.</p>
                <button class="cta-btn" onclick="alert('Event eintragen')">EINTRAGEN</button>
            </div>
        </div>
    </div>

    
    <div id="search-view" class="hidden">
        <div class="header">
            <button class="back-btn" onclick="showView('main')">←</button>
            <span class="page-title">Suchergebnisse</span>
            <button class="burger-menu" onclick="toggleBurgerMenu()">☰</button>
        </div>
        
        <div class="content">
            <input type="text" class="search-bar" placeholder="Suche">
            <div class="event-list-grid">
                
                    <div class="event-list-item" onclick="showEventDetails()">
    <div class="event-list-image" data-category="be"></div>
    <div class="event-list-info">
        <div class="event-list-date">Saturday, 26.07.2025</div>
        <h4>CSD Berlin 2025</h4>
    </div>
</div>
                
                    <div class="event-list-item" onclick="showEventDetails()">
    <div class="event-list-image" data-category="mv"></div>
    <div class="event-list-info">
        <div class="event-list-date">Saturday, 19.07.2025</div>
        <h4>CSD Rostock 2025</h4>
    </div>
</div>
                
                    <div class="event-list-item" onclick="showEventDetails()">
    <div class="event-list-image" data-category="sn"></div>
    <div class="event-list-info">
        <div class="event-list-date">Saturday, 28.06.2025</div>
        <h4>CSD Leipzig 2025</h4>
    </div>
</div>
                
                    <div class="event-list-item" onclick="showEventDetails()">
    <div class="event-list-image" data-category="mv"></div>
    <div class="event-list-info">
        <div class="event-list-date">Saturday, 07.06.2025</div>
        <h4>CSD Schwerin 2025</h4>
    </div>
</div>
                
                    <div class="event-list-item" onclick="showEventDetails()">
    <div class="event-list-image" data-category="sn"></div>
    <div class="event-list-info">
        <div class="event-list-date">Saturday, 31.05.2025</div>
        <h4>CSD Dresden 2025</h4>
    </div>
</div>
                
                    <div class="event-list-item" onclick="showEventDetails()">
    <div class="event-list-image" data-category="bb"></div>
    <div class="event-list-info">
        <div class="event-list-date">Saturday, 17.05.2025</div>
        <h4>CSD Potsdam 2025</h4>
    </div>
</div>
                
            </div>
        </div>
    </div>

    
    <div id="calendar-view" class="hidden">
        <div class="header">
            <button class="back-btn" onclick="showView('main')">←</button>
            <span class="page-title">Unser Kalender</span>
            <button class="burger-menu" onclick="toggleBurgerMenu()">☰</button>
        </div>
        
        <div class="content">
            <div class="view-toggle">
                <button class="toggle-btn active">Kartenansicht</button>
                <button class="toggle-btn">Kalenderansicht</button>
            </div>

            <div class="tabs">
                <button class="tab active">Ostdeutschland</button>
                <button class="tab">Berlin</button>
                <button class="tab">Brandenburg</button>
                <button class="tab">Mecklenburg-Vorpommern</button>
                <button class="tab">Sachsen</button>
                <button class="tab">Sachsen-Anhalt</button>
                <button class="tab">Thüringen</button>
            </div>

            <div class="map-container">
                <div class="map-marker marker-1">🎵</div>
                <div class="map-marker marker-2">⚡</div>
                <div class="map-marker marker-3">✈️</div>
            </div>
        </div>
    </div>

    
    <div id="event-details" class="hidden">
        
        <div class="event-header-image">
            <button class="back-btn" onclick="showView('main')" style="position: absolute; top: 20px; left: 20px; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer;">←</button>
            <button class="bookmark-btn" style="top: 20px; right: 20px;">🔖</button>
            
            <div class="event-actions">
                <button class="action-btn map-btn">📍 Auf Karte öffnen</button>
                <button class="action-btn join-btn">Ich bin dabei!</button>
            </div>
        </div>

        <div class="event-meta">
            <h1 class="event-meta-title">CSD Berlin 2025</h1>
            
            <div class="meta-item">
                <div class="meta-icon date-icon">📅</div>
                <div class="meta-text">
                    <h4>26.07.2025</h4>
                    <p>Saturday, 12:00 bis 18:00 Uhr</p>
                </div>
            </div>

            <div class="meta-item">
                <div class="meta-icon location-icon">📍</div>
                <div class="meta-text">
                    <h4>Berlin</h4>
                    <p>Leipziger Straße / Charlottenstraße, 10117 Berlin</p>
                </div>
            </div>

            <div class="meta-item">
                <div class="meta-icon organizer-icon">👤</div>
                <div class="meta-text">
                    <h4>Berliner CSD e.V.</h4>
                    <p>Organizer</p>
                </div>
                <button class="contact-btn">Kontakt</button>
            </div>

            <div class="description">
                <h3>Beschreibung</h3>
                <p><p>Beschreibung hier …</p>
</p>
            </div>
        </div>
        
    </div>

    
    <div id="events-view" class="hidden">
        <div class="header">
            <button class="back-btn" onclick="showView('main')">←</button>
            <span class="page-title">Veranstaltungen</span>
            <button class="burger-menu" onclick="toggleBurgerMenu()">☰</button>
        </div>
        
        <div class="content">
            <div class="tabs">
                <button class="tab active">Kommende Veranstaltungen</button>
                <button class="tab">Veranstaltung eintragen</button>
            </div>

            
            
                <div class="event-list-grid">
                    
                        <div class="event-list-item" onclick="showEventDetails()">
    <div class="event-list-image" data-category="be"></div>
    <div class="event-list-info">
        <div class="event-list-date">Saturday, 26.07.2025</div>
        <h4>CSD Berlin 2025</h4>
    </div>
</div>
                    
                        <div class="event-list-item" onclick="showEventDetails()">
    <div class="event-list-image" data-category="mv"></div>
    <div class="event-list-info">
        <div class="event-list-date">Saturday, 19.07.2025</div>
        <h4>CSD Rostock 2025</h4>
    </div>
</div>
                    
                        <div class="event-list-item" onclick="showEventDetails()">
    <div class="event-list-image" data-category="sn"></div>
    <div class="event-list-info">
        <div class="event-list-date">Saturday, 28.06.2025</div>
        <h4>CSD Leipzig 2025</h4>
    </div>
</div>
                    
                        <div class="event-list-item" onclick="showEventDetails()">
    <div class="event-list-image" data-category="mv"></div>
    <div class="event-list-info">
        <div class="event-list-date">Saturday, 07.06.2025</div>
        <h4>CSD Schwerin 2025</h4>
    </div>
</div>
                    
                        <div class="event-list-item" onclick="showEventDetails()">
    <div class="event-list-image" data-category="sn"></div>
    <div class="event-list-info">
        <div class="event-list-date">Saturday, 31.05.2025</div>
        <h4>CSD Dresden 2025</h4>
    </div>
</div>
                    
                        <div class="event-list-item" onclick="showEventDetails()">
    <div class="event-list-image" data-category="bb"></div>
    <div class="event-list-info">
        <div class="event-list-date">Saturday, 17.05.2025</div>
        <h4>CSD Potsdam 2025</h4>
    </div>
</div>
                    
                </div>
            
        </div>
    </div>
</div>


<button class="floating-btn" onclick="alert('Event erstellen')">+</button>

  </div>
  
<script src="/js/app.min.aa6ac548cdc572f5c1e488f73ce5728a14a6ad3054ae031d659ea259182eae35.js"></script>
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
    <lastBuildDate>Sat, 26 Jul 2025 12:00:00 +0200</lastBuildDate>
    <atom:link href="http://localhost:1313/index.xml" rel="self" type="application/rss+xml" />
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

## public/js/app.min.aa6ac548cdc572f5c1e488f73ce5728a14a6ad3054ae031d659ea259182eae35.js

```js
class EventApp{constructor(){this.currentView="main",this.isDesktop=window.innerWidth>=1024,this.init()}init(){this.bindGlobalFunctions(),this.bindEvents(),this.showView("main")}bindGlobalFunctions(){window.showView=this.showView.bind(this),window.showEventDetails=this.showEventDetails.bind(this),window.toggleBurgerMenu=this.toggleBurgerMenu.bind(this)}bindEvents(){document.addEventListener("click",e=>{e.target.matches(".tab, .toggle-btn")&&(e.target.parentElement.querySelectorAll(".tab, .toggle-btn").forEach(e=>e.classList.remove("active")),e.target.classList.add("active"))}),window.addEventListener("resize",()=>{const e=this.isDesktop;this.isDesktop=window.innerWidth>=1024,e!==this.isDesktop&&this.isDesktop&&document.getElementById("burger-overlay")?.classList.add("hidden")})}showView(e){document.querySelectorAll('[id$="-view"], #event-details').forEach(e=>e.classList.add("hidden"));const t=document.getElementById(`${e}-view`);t&&(t.classList.remove("hidden"),this.updateNavigation(e),this.currentView=e)}showEventDetails(){document.querySelectorAll('[id$="-view"]').forEach(e=>e.classList.add("hidden")),document.getElementById("event-details")?.classList.remove("hidden")}toggleBurgerMenu(){this.isDesktop||document.getElementById("burger-overlay")?.classList.toggle("hidden")}updateNavigation(e){const n={main:0,events:1,calendar:2},t=n[e];t!==0[0]&&document.querySelectorAll(".burger-item, .sidebar-item").forEach((e,n)=>{e.classList.toggle("active",n===t)})}}document.addEventListener("DOMContentLoaded",()=>new EventApp)
```

## public/js/app.min.bb6f0829e7443a8ed20dd34477df485d9c4b34f979e9a65ec29b7f2a1ed1c6dd.js

```js
class EventApp{constructor(){this.currentView="main",this.isDesktop=window.innerWidth>=1024,this.init()}init(){this.bindGlobalFunctions(),this.bindEvents(),this.showView("main")}bindGlobalFunctions(){window.showView=this.showView.bind(this),window.showEventDetails=this.showEventDetails.bind(this),window.toggleBurgerMenu=this.toggleBurgerMenu.bind(this),window.toggleTheme=this.toggleTheme.bind(this)}toggleTheme(){const t=document.documentElement,n="bo-theme",e=t.getAttribute("data-theme")==="dark"?"light":"dark";t.setAttribute("data-theme",e),localStorage.setItem(n,e),document.querySelector('meta[name="theme-color"]').content=e==="dark"?"#121212":"#f8f9fa"}bindEvents(){document.addEventListener("click",e=>{e.target.matches(".tab, .toggle-btn")&&(e.target.parentElement.querySelectorAll(".tab, .toggle-btn").forEach(e=>e.classList.remove("active")),e.target.classList.add("active"))}),window.addEventListener("resize",()=>{const e=this.isDesktop;this.isDesktop=window.innerWidth>=1024,e!==this.isDesktop&&this.isDesktop&&document.getElementById("burger-overlay")?.classList.add("hidden")})}showView(e){document.querySelectorAll('[id$="-view"], #event-details').forEach(e=>e.classList.add("hidden"));const t=document.getElementById(`${e}-view`);t&&(t.classList.remove("hidden"),this.updateNavigation(e),this.currentView=e)}showEventDetails(){document.querySelectorAll('[id$="-view"]').forEach(e=>e.classList.add("hidden")),document.getElementById("event-details")?.classList.remove("hidden")}toggleBurgerMenu(){this.isDesktop||document.getElementById("burger-overlay")?.classList.toggle("hidden")}updateNavigation(e){const n={main:0,events:1,calendar:2},t=n[e];t!==0[0]&&document.querySelectorAll(".burger-item, .sidebar-item").forEach((e,n)=>{e.classList.toggle("active",n===t)})}}document.addEventListener("DOMContentLoaded",()=>new EventApp),document.getElementById("theme-toggle")?.addEventListener("click",()=>toggleTheme())
```

## public/sitemap.xml

```xml
<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>http://localhost:1313/</loc>
    <lastmod>2025-09-06T13:00:00+02:00</lastmod>
  </url><url>
    <loc>http://localhost:1313/events/</loc>
    <lastmod>2025-09-06T13:00:00+02:00</lastmod>
  </url><url>
    <loc>http://localhost:1313/events/2025_csd_berlin/</loc>
    <lastmod>2025-07-26T12:00:00+02:00</lastmod>
  </url><url>
    <loc>http://localhost:1313/events/2025_csd_rostock/</loc>
    <lastmod>2025-07-19T12:30:00+02:00</lastmod>
  </url><url>
    <loc>http://localhost:1313/events/2025_csd_leipzig/</loc>
    <lastmod>2025-06-28T13:00:00+02:00</lastmod>
  </url><url>
    <loc>http://localhost:1313/events/2025_csd_schwerin/</loc>
    <lastmod>2025-06-07T14:00:00+02:00</lastmod>
  </url><url>
    <loc>http://localhost:1313/events/2025_csd_dresden/</loc>
    <lastmod>2025-05-31T12:00:00+02:00</lastmod>
  </url><url>
    <loc>http://localhost:1313/events/2025_csd_potsdam/</loc>
    <lastmod>2025-05-17T12:00:00+02:00</lastmod>
  </url><url>
    <loc>http://localhost:1313/categories/</loc>
  </url><url>
    <loc>http://localhost:1313/tags/</loc>
  </url>
</urlset>
```

## public/tags/index.html

```html
<!doctype html>
<html lang="de">
<head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Tags | Bündnis Ost</title>


<link rel="stylesheet" href="/css/app.min.15276f049e4d4c5994584f49b3a2ce3f80842c8ebbddb1ec0889b0854701be0a.css">
</head>
<body>
  <div class="app-container">
    
  <section class="p-4">
    
  </section>

  </div>
  
<script src="/js/app.min.aa6ac548cdc572f5c1e488f73ce5728a14a6ad3054ae031d659ea259182eae35.js"></script>
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

## resources/_gen/assets/css/app.css_5d1ae7b26729580b7c0ef1c83fb083f3.json

```json
{"Target":"/css/app.min.15276f049e4d4c5994584f49b3a2ce3f80842c8ebbddb1ec0889b0854701be0a.css","MediaType":"text/css","Data":{"Integrity":"sha256-FSdvBJ5NTFmUWE9Js6LOP4CELI673bHsCImwhUcBvgo="}}
```

