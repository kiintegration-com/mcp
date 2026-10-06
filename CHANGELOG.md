# Änderungen

Alle nennenswerten Änderungen an diesem Repo. Format nach [Keep a Changelog](https://keepachangelog.com/de/1.1.0/), Versionen nach [Semantic Versioning](https://semver.org/lang/de/): Eine neue Hauptversion ändert Namen oder Eingaben eines Werkzeugs, eine Nebenversion bringt neue Werkzeuge, eine Fehlerkorrektur ändert nichts an der Schnittstelle.

## [1.0.0] – 2026-10-07

Erste öffentliche Fassung.

### Neu

- Gehosteter MCP-Server unter `https://kiintegration.com/api/mcp` (Streamable HTTP, zustandslos, ohne Anmeldung).
- Vier Werkzeuge, alle nur lesend: `dienstleister_suchen`, `profil_abrufen`, `leistungsfelder_auflisten`, `foerderprogramme_suchen`.
- `server.mjs`: stdio-Brücke ohne Abhängigkeiten für Clients ohne HTTP-Transport, mit Test (`node --test`).
- `server.json` für das offizielle MCP-Verzeichnis, `glama.json`, Dockerfile.

### Geändert gegenüber der unveröffentlichten Fassung 0.1.0

- Die Werkzeuge laufen auf dem Server statt im Client; die Brücke reicht nur weiter. Aus `register_suchen` wurde `dienstleister_suchen` (mit Leistungsfeld, Land, Region und Freitext), `registerseite_abrufen` entfällt, `foerderprogramme_suchen` ist neu.

[1.0.0]: https://github.com/kiintegration-com/mcp/releases/tag/v1.0.0
