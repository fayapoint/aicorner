# MongoDB MCP Server

This repository includes an MCP (Model Context Protocol) server that exposes MongoDB as resources and tools for LLM clients that speak MCP.

- Server script: `scripts/mcp/mongodb.mjs`
- Start command: `npm run mcp:mongodb`
- Transport: stdio
- SDK: `@modelcontextprotocol/sdk` (TypeScript/Node)

## Requirements
- Node.js v18+ (recommended v20+)
- Environment variable `MONGODB_URI` set (or `MONGODB_USS_URI` as fallback)
- Optional environment variables:
  - `MCP_MONGODB_DB`: overrides the database name from the connection string.
  - `MCP_MONGODB_ALLOW_WRITES`: set to `true` to enable write tools (`insertOne`, `updateOne`, `deleteOne`). Defaults to `false` (read‑only).

The server will automatically load `.env.local` if present, then `.env`.

## Install
```
npm install
```

## Run
```
npm run mcp:mongodb
```
This starts the MCP server over stdio. It waits for an MCP‑capable client (e.g., Claude Desktop, Cursor, Windsurf) to connect.

## Tools (read‑only by default)
- `listDatabases()` → list DBs
- `listCollections({ dbName? })` → list collections in a DB
- `find({ collection, filter?, projection?, sort?, limit?, dbName? })`
- `aggregate({ collection, pipeline, dbName?, allowDiskUse?, maxTimeMS? })`

Enable writes with `MCP_MONGODB_ALLOW_WRITES=true` to expose:
- `insertOne({ collection, document, dbName? })`
- `updateOne({ collection, filter, update, upsert?, dbName? })`
- `deleteOne({ collection, filter, dbName? })`

Note: `filter`, `projection`, `sort`, `document`, and `update` can be JSON strings or objects.

## Resources
A dynamic resource lets you query via a URI:
```
mongo://{collection}?filter={"status":"published"}&limit=10&dbName=mydb
```
Supported query params: `filter`, `projection`, `sort`, `limit`, `dbName`.

## Example Client Configuration (Claude Desktop)
Add to your Claude Desktop MCP settings (example):
```json
{
  "mcpServers": {
    "mongodb": {
      "command": "node",
      "args": ["scripts/mcp/mongodb.mjs"],
      "env": {
        "MONGODB_URI": "${MONGODB_URI}",
        "MCP_MONGODB_DB": "${MCP_MONGODB_DB}",
        "MCP_MONGODB_ALLOW_WRITES": "false"
      }
    }
  }
}
```
Update env values to suit your setup or rely on `.env.local`.

## Safety
- Writes are disabled by default. Only enable with `MCP_MONGODB_ALLOW_WRITES=true` if you trust the client and session.
- Consider restricting accessible collections by adding allow‑list checks inside `mongodb.mjs` if needed.

## Troubleshooting
- Ensure Node v18+ (`node -v`).
- Ensure `MONGODB_URI` is valid and reachable from your environment/network.
- If the server appears to hang, that’s expected—it's waiting for an MCP client over stdio.
- Use JSON strings for complex parameters if your MCP client UI cannot send object literals directly.
