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
