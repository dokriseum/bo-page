# OpenGraph Fetcher

Python-Script zum Laden von OpenGraph-Tags aus verlinkten Seiten zur Build-Zeit.

## Installation

```bash
pip3 install -r scripts/requirements.txt
```

## Verwendung

### Manuell
```bash
python3 scripts/fetch_opengraph.py
```

### Automatisch beim Build
```bash
npm run prebuild  # Lädt OpenGraph-Daten
npm run build     # Baut Hugo-Site
```

## Funktion

Das Script:
1. Liest `content/netzwerk.md`
2. Extrahiert alle URLs
3. Lädt OpenGraph-Tags von jeder URL
4. Speichert Daten in `data/opengraph.json`

## Nutzung in Hugo Templates

```go
{{ $ogData := .Site.Data.opengraph }}
{{ range $url, $data := $ogData }}
  <h3>{{ $data.title }}</h3>
  <p>{{ $data.description }}</p>
  {{ if $data.image }}
    <img src="{{ $data.image }}" alt="{{ $data.title }}">
  {{ end }}
{{ end }}
```
