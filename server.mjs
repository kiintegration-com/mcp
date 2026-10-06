#!/usr/bin/env node
/**
 * kiintegration-mcp — stdio-Brücke zum MCP-Server des KI Integration Registers.
 *
 * WAS SIE IST. Der Server läuft unter https://kiintegration.com/api/mcp
 * (Streamable HTTP, ohne Anmeldung). Clients, die nur stdio sprechen
 * (ältere Claude-Desktop-Fassungen, manche IDEs), starten diese Datei; sie
 * reicht jede JSON-RPC-Zeile von stdin als POST weiter und schreibt die
 * Antwort als Zeile nach stdout. Werkzeuge, Grenzen und Daten bestimmt der
 * Server — hier steht keine eigene Logik, also kann die Brücke nicht
 * veralten, wenn der Server dazulernt.
 *
 * WARUM KEINE ABHÄNGIGKEITEN. Node 18 bringt `fetch` und `readline` mit; ein
 * SDK brächte für 80 Zeilen Weiterreichen einen Paketbaum.
 *
 * Quelle: kiintegration.com, Repository-Ordner mcp/ (einzige Fassung);
 * das öffentliche Repo bekommt sie über mcp-repo/sync.sh.
 *
 *   npx -y kiintegration-mcp
 *   KIR_MCP_URL=http://localhost:4321/api/mcp node server.mjs   (gegen eine lokale Vorschau)
 */
import { createInterface } from 'node:readline';

const ZIEL = process.env.KIR_MCP_URL || 'https://kiintegration.com/api/mcp';
const VERSION = '1.0.0';
const UA = `kiintegration-mcp/${VERSION} (+https://kiintegration.com/mcp/; node ${process.version})`;
const ZEIT_MS = 30_000;

const schreib = (o) => process.stdout.write(`${JSON.stringify(o)}\n`);
const fehler = (id, code, message) => ({ jsonrpc: '2.0', id: id ?? null, error: { code, message } });

/** Die ids einer Nachricht oder eines Batches — für Fehler, die der Server nicht beantwortet. */
function ids(msg) {
  const liste = Array.isArray(msg) ? msg : [msg];
  return liste.filter((m) => m && typeof m === 'object' && m.id !== undefined && m.id !== null).map((m) => m.id);
}

async function weiter(zeile) {
  let msg;
  try {
    msg = JSON.parse(zeile);
  } catch {
    return schreib(fehler(null, -32700, 'Parse error'));
  }
  let res;
  try {
    res = await fetch(ZIEL, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream', 'user-agent': UA },
      body: zeile,
      signal: AbortSignal.timeout(ZEIT_MS),
    });
  } catch (err) {
    for (const id of ids(msg)) schreib(fehler(id, -32603, `kiintegration.com nicht erreichbar: ${err.message}`));
    return;
  }
  if (res.status === 202) return;
  const text = await res.text();
  let antwort;
  try {
    antwort = JSON.parse(text);
  } catch {
    for (const id of ids(msg)) schreib(fehler(id, -32603, `kiintegration.com antwortet mit HTTP ${res.status}`));
    return;
  }
  /* Ein Fehler des Servers ohne id (Grenze, Version) gehört zur Nachricht, die ihn ausgelöst hat. */
  if (!Array.isArray(antwort) && antwort?.error && antwort.id === null && !Array.isArray(msg) && msg?.id !== undefined) {
    antwort.id = msg.id;
  }
  schreib(antwort);
}

createInterface({ input: process.stdin }).on('line', (zeile) => {
  if (zeile.trim()) void weiter(zeile);
});
