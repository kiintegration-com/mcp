# stdio-Brücke zum gehosteten MCP-Server. Aufruf: docker run -i --rm kiintegration-mcp
# Keine Abhängigkeiten, also kein npm install: Das Abbild ist Node plus eine Datei.
FROM node:22-alpine

LABEL io.modelcontextprotocol.server.name="com.kiintegration/register"

WORKDIR /app
COPY package.json server.mjs ./

ENV KIR_MCP_URL=https://kiintegration.com/api/mcp
USER node
ENTRYPOINT ["node", "server.mjs"]
