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

# 3 Python-Dependencies installieren (für OpenGraph-Fetcher)
pip3 install -r scripts/requirements.txt

# 4 Lokalen Dev-Server starten
hugo server

# 5 Browser öffnen
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
| **APT-Repo** | `echo "deb [trusted=yes] https://apt.gohugo.io/ /" &#124; doas tee /etc/apt/sources.list.d/hugo.list` \n `doas apt update && doas apt install hugo` |
| **APT-Repo** | ```echo "deb [trusted=yes] https://apt.gohugo.io/ /" &#124; doas tee /etc/apt/sources.list.d/hugo.list` <br> `doas apt update && doas apt install hugo` |
| **Manuell** | Aktuelle `.deb` oder `.tar.gz` von <https://github.com/gohugoio/hugo/releases> laden und mit `dpkg -i …` (bzw. entpacken) installieren |


### macOS 🍏

| Variante | Befehl |
|----------|--------|
| **Homebrew (empfohlen)** | Installation: `brew install hugo` <br> Aktualisieren: `brew upgrade hugo` |
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
| **OpenGraph-Daten aktualisieren** | `python3 scripts/fetch_opengraph.py` (lädt OpenGraph-Tags aus `netzwerk.md`) |
| **Bauen für Prod** | `npm run prebuild && hugo --minify` → ergibt statisches HTML/CSS/JS in `public/` |

### Python-Abhängigkeit für OpenGraph-Fetcher

Das Projekt nutzt ein Python-Script (`scripts/fetch_opengraph.py`), das OpenGraph-Tags aus verlinkten Seiten lädt:

**Installation:**
```bash
pip3 install -r scripts/requirements.txt
```

**Wann wird es ausgeführt?**
- Automatisch bei `npm run prebuild` (vor Hugo-Build)
- Manuell mit `python3 scripts/fetch_opengraph.py`

Das Script extrahiert URLs aus `content/netzwerk.md`, lädt deren OpenGraph-Metadaten und speichert sie in `data/opengraph.json` für die Verwendung in Hugo-Templates.

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

> **Sicherheitshinweis:** Der Ordner `static/backend/` enthält administrative Werkzeuge (z. B. Tests, Import-Skripte). Schütze ihn serverseitig – etwa per `.htaccess` mit Authentifizierung oder IP-Allowlist –, sodass nur berechtigte Admins darauf zugreifen können.

---

## Lizenz & Mitwirken

*© 2025 Bündnis Ost, BÜNDNIS 90/DIE GRÜNEN.*  
Quellcode steht unter der **MIT-Lizenz** → siehe [`LICENSE`](LICENSE).

> **Pull Requests / Issues welcome!**  
> Wir freuen uns über Feedback, Bugreports oder Layout-Verbesserungen. Schreib uns einfach ein Issue oder öffne direkt einen PR.

---

### 🌻 Gemeinsam gestalten wir eine grünere Zukunft – auch im Web!
