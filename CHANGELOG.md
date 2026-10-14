# Änderungen

Alle nennenswerten Änderungen an diesem Repo. Format nach [Keep a Changelog](https://keepachangelog.com/de/1.1.0/), Versionen nach [Semantic Versioning](https://semver.org/lang/de/): Eine neue Hauptversion ändert Namen oder Eingaben eines Werkzeugs, eine Nebenversion bringt neue Werkzeuge, eine Fehlerkorrektur ändert nichts an der Schnittstelle.

## [Unveröffentlicht]

### Geändert

- `server.json` nennt nur noch den Remote-Server. Der Block `packages` (npm-Paket `kiintegration-mcp`) kommt zurück, sobald das Paket auf npm liegt; vorher lehnt das offizielle MCP-Verzeichnis die Veröffentlichung ab.
- README: Glama-Bewertung und Abschnitt „In Verzeichnissen“.
- Grenzen: Über Claude.ai Connectors und Smithery gilt eine eigene Grenze für alle Nutzer des Zugangs (300 Nachrichten in der Minute, 600 Werkzeugaufrufe in der Stunde), für den ganzen Server höchstens 1.000 Werkzeugaufrufe in der Stunde. Je Adresse unverändert 60 und 120. Ein Werkzeugaufruf über der Grenze kommt als Werkzeugergebnis mit `isError` und Wartezeit statt als HTTP 429.
- `instructions` des Servers ohne den Hinweis auf die kostenlose Anfrage.

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
