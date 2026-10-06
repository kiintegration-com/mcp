/**
 * Die stdio-Brücke gegen einen lokalen Server, der wie
 * https://kiintegration.com/api/mcp antwortet: Anfragen kommen als Zeile
 * zurück, Benachrichtigungen nicht, Fehler des Servers mit der richtigen id.
 * Ohne Netz nach außen.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

const BRUECKE = fileURLToPath(new URL('../server.mjs', import.meta.url));

/** Antwortet wie der gehostete Server: 202 für Benachrichtigungen, sonst JSON. */
async function server(art = 'gut') {
  const s = http.createServer(async (req, res) => {
    const teile = [];
    for await (const t of req) teile.push(t);
    if (art === 'kaputt') { res.writeHead(502, { 'content-type': 'text/html' }); res.end('<h1>Bad Gateway</h1>'); return; }
    if (art === 'grenze') {
      res.writeHead(429, { 'content-type': 'application/json', 'retry-after': '30' });
      res.end(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32000, message: 'Rate limit' } }));
      return;
    }
    const msg = JSON.parse(Buffer.concat(teile).toString('utf8'));
    if (msg.id === undefined) { res.writeHead(202); res.end(); return; }
    const result = msg.method === 'initialize'
      ? { protocolVersion: '2025-06-18', capabilities: { tools: {} }, serverInfo: { name: 'kiintegration-register', version: '1.0.0' } }
      : msg.method === 'tools/list' ? { tools: [{ name: 'dienstleister_suchen' }] } : {};
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ jsonrpc: '2.0', id: msg.id, result }));
  });
  await new Promise((r) => s.listen(0, '127.0.0.1', r));
  return s;
}

function bruecke(url) {
  const p = spawn(process.execPath, [BRUECKE], { env: { ...process.env, KIR_MCP_URL: url }, stdio: ['pipe', 'pipe', 'inherit'] });
  const zeilen = [];
  const warten = [];
  createInterface({ input: p.stdout }).on('line', (z) => { zeilen.push(JSON.parse(z)); warten.shift()?.(); });
  return {
    schreib: (o) => p.stdin.write((typeof o === 'string' ? o : JSON.stringify(o)) + '\n'),
    async naechste() { if (!zeilen.length) await new Promise((r) => warten.push(r)); return zeilen.shift(); },
    ende: () => p.kill(),
  };
}

test('Anfragen gehen hin und zurück, Benachrichtigungen bleiben stumm', async () => {
  const s = await server();
  const b = bruecke(`http://127.0.0.1:${s.address().port}/api/mcp`);
  try {
    b.schreib({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {} });
    assert.equal((await b.naechste()).result.serverInfo.name, 'kiintegration-register');
    b.schreib({ jsonrpc: '2.0', method: 'notifications/initialized' });
    b.schreib({ jsonrpc: '2.0', id: 2, method: 'tools/list' });
    const liste = await b.naechste();
    assert.equal(liste.id, 2);
    assert.equal(liste.result.tools[0].name, 'dienstleister_suchen');
    b.schreib('{kaputt');
    assert.equal((await b.naechste()).error.code, -32700);
  } finally {
    b.ende();
    s.close();
  }
});

test('HTML-Fehler des Servers wird zum JSON-RPC-Fehler mit der id der Anfrage', async () => {
  const s = await server('kaputt');
  const b = bruecke(`http://127.0.0.1:${s.address().port}/api/mcp`);
  try {
    b.schreib({ jsonrpc: '2.0', id: 'a1', method: 'ping' });
    const a = await b.naechste();
    assert.equal(a.id, 'a1');
    assert.match(a.error.message, /502/);
  } finally {
    b.ende();
    s.close();
  }
});

test('Grenze des Servers kommt mit der id der Anfrage an', async () => {
  const s = await server('grenze');
  const b = bruecke(`http://127.0.0.1:${s.address().port}/api/mcp`);
  try {
    b.schreib({ jsonrpc: '2.0', id: 7, method: 'tools/call', params: { name: 'dienstleister_suchen', arguments: {} } });
    const a = await b.naechste();
    assert.equal(a.id, 7);
    assert.equal(a.error.code, -32000);
  } finally {
    b.ende();
    s.close();
  }
});
