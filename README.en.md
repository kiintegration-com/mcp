# KI Integration Register: MCP server

Find AI agencies, AI consultancies and automation providers in Germany, Austria and Switzerland from Claude, ChatGPT, Cursor or VS Code, plus public funding programmes for digitalisation and AI per state. Hosted, no sign-up, read-only.

```text
https://kiintegration.com/api/mcp
```

The [KI Integration Register](https://kiintegration.com/?utm_source=github&utm_medium=referral&utm_campaign=mcp) lists firms that implement AI projects for businesses in the DACH region, with type, location, service fields and verification status. Entries are compiled from public sources, mainly the firms' legal notices (Impressum); no firm pays to be listed or to move up. The register is in German, and so are the tool descriptions and answers.

## Set up

| Client | How |
|---|---|
| Claude Code | `claude mcp add --transport http kiintegration https://kiintegration.com/api/mcp` |
| Claude.ai / Claude Desktop | Settings → Connectors → Add custom connector, URL `https://kiintegration.com/api/mcp` |
| Cursor | `~/.cursor/mcp.json`: `{"mcpServers":{"kiintegration":{"url":"https://kiintegration.com/api/mcp"}}}` |
| VS Code | `code --add-mcp '{"name":"kiintegration","type":"http","url":"https://kiintegration.com/api/mcp"}'` |
| Windsurf | `{"mcpServers":{"kiintegration":{"serverUrl":"https://kiintegration.com/api/mcp"}}}` |
| stdio-only clients | `npx -y mcp-remote https://kiintegration.com/api/mcp`, or `node server.mjs` from this repo |

## Tools

| Tool | Purpose |
|---|---|
| `dienstleister_suchen` | Search firms by service field, country (DE, AT, CH), state, city or keyword. Max. 25 results, verified first. |
| `profil_abrufen` | A firm's profile as Markdown: service fields, evidence score, sources, as-of date. |
| `leistungsfelder_auflisten` | Service fields with counts and slugs for the search. |
| `foerderprogramme_suchen` | Funding programmes: federal and EU per country, plus the state's or canton's own with `region`. Rate, maximum, deadline, check date, official source. |

All tools are read-only.

## Limits and privacy

- Only what the public profile pages show. No phone numbers, email addresses, register or tax numbers, or names of representatives.
- Entries are unverified unless marked as verified (the firm claimed and confirmed its entry).
- Single lookups: max. 25 results per search, no paging; per sender address 60 messages per minute and 120 tool calls per hour, then HTTP 429 with `Retry-After`. Systematic extraction is prohibited by the [terms of use](https://kiintegration.com/nutzungsbedingungen/?utm_source=github&utm_medium=referral&utm_campaign=mcp).
- The server stores no request content. Rate counters live in memory for at most one hour.

## Local stdio bridge

`server.mjs` (Node 18+, no dependencies) forwards each JSON-RPC line from stdin to the hosted server and writes the reply to stdout. `KIR_MCP_URL` overrides the target. Tests: `node --test`.

## Licence

Code: [MIT](LICENSE). Data returned by the server is not covered by the MIT licence; it belongs to the register and is subject to its [terms of use](https://kiintegration.com/nutzungsbedingungen/?utm_source=github&utm_medium=referral&utm_campaign=mcp): single retrieval with attribution "KI Integration Register, kiintegration.com" is permitted; systematic extraction and reproduction of substantial parts are not (§§ 87a ff. UrhG, German sui generis database right); the text and data mining reservation under § 44b (3) UrhG is declared.

[Deutsch](README.md) · [Changelog](CHANGELOG.md) · [Security](SECURITY.md)
