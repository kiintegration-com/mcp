# Sicherheit

Der Server unter `https://kiintegration.com/api/mcp` liest nur und kennt keine Anmeldung; `server.mjs` in diesem Repo reicht Nachrichten nur weiter. Melden Sie trotzdem, wenn Ihnen etwas davon auffällt:

- Eine Antwort enthält Angaben, die auf der öffentlichen Profilseite nicht stehen, etwa Telefonnummern, Mailadressen, Register- oder Steuernummern oder Namen von Personen.
- Ein Werkzeug lässt sich dazu bringen, mehr als 25 Treffer zu liefern, die Grenzen zu umgehen oder etwas zu verändern.
- Ein Text aus einem Eintrag versucht, einem Modell Anweisungen zu geben (Prompt-Injection über Daten Dritter).
- Die Brücke oder das Dockerfile lassen sich missbrauchen.

## Melden

Bitte nicht als öffentliches Issue, sondern per Mail an **info@kiintegration.com**, Betreff „Sicherheit MCP-Repo“. Beschreiben Sie, welches Werkzeug oder welche Datei betroffen ist und wie sich das Problem zeigt.

Wir bestätigen den Eingang innerhalb von 3 Werktagen und melden uns mit einer Einschätzung, sobald wir das Problem nachvollzogen haben. Wer meldet, wird auf Wunsch im CHANGELOG genannt.

## Unterstützte Fassung

Gepflegt wird nur der aktuelle Stand auf `main` und der gehostete Server.
