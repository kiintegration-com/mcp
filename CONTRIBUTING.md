# Mitmachen

Am meisten helfen:

- **Fehler melden**: eine Antwort, die nicht zur Profilseite passt, ein Filter, der nicht greift, eine Beschreibung, die ein Modell falsch versteht.
- **Werkzeug vorschlagen**, das für die Suche nach einem KI-Umsetzer oder nach Förderung fehlt.
- **Einrichtung für einen Client** ergänzen, der im README noch fehlt — mit dem getesteten Wortlaut.

Für alles davon reicht ein [Issue](https://github.com/kiintegration-com/mcp/issues/new).

## Wo was liegt

Die Werkzeuge laufen auf dem Server von kiintegration.com; ihr Quelltext liegt im Repo der Website und nicht hier. Dieses Repo enthält die stdio-Brücke (`server.mjs`), ihre Tests und die Beschreibungen für Verzeichnisse. Änderungen an Werkzeugen nehmen wir als Issue auf und setzen sie im Server um.

## Pull Requests

- `node --test` muss grün sein.
- Keine Abhängigkeiten. Die Brücke kommt mit Node 18 aus und soll es bleiben.
- Deutsch für Texte, die ein Mensch liest; Kommentare im Code begründen, warum etwas so ist.

## Was nicht aufgenommen wird

- Werkzeuge, die den Bestand vollständig auslesen, blättern oder Kontaktdaten liefern. Die Nutzungsbedingungen des Registers untersagen das systematische Auslesen.
- Werbung für Dienstleister oder eine Sortierung nach Bezahlung.
