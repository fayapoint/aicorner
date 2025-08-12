/*
 MongoDB MCP Server
 - Transport: stdio
 - Uses env vars: MONGODB_URI (fallback MONGODB_USS_URI), MONGODB_DB (optional), MCP_MONGODB_DB (override), MCP_MONGODB_ALLOW_WRITES (default false)
*/

import path from 'node:path';
import fs from 'node:fs';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { z } from 'zod';
import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// Load env: prefer .env.local if present, then .env
const root = process.cwd();
const envLocalPath = path.join(root, '.env.local');
if (fs.existsSync(envLocalPath)) dotenv.config({ path: envLocalPath });
dotenv.config();

// Resolve connection settings
const URI = process.env.MONGODB_URI || process.env.MONGODB_USS_URI;
if (!URI) {
  console.error('Missing MONGODB_URI (or MONGODB_USS_URI) in environment.');
  process.exit(1);
}
const DB_OVERRIDE = process.env.MCP_MONGODB_DB || process.env.MONGODB_DB;
const ALLOW_WRITES = String(process.env.MCP_MONGODB_ALLOW_WRITES || 'false').toLowerCase() === 'true';

// Create MCP server
const server = new McpServer({ name: 'mongodb-mcp', version: '1.0.0' });

// Shared Mongo client
const client = new MongoClient(URI, { appName: 'mongodb-mcp' });
await client.connect();
const db = DB_OVERRIDE ? client.db(DB_OVERRIDE) : client.db();

// Utility: parse JSON inputs that might be strings
function parseMaybeJson(input, fallback) {
  if (input == null) return fallback;
  if (typeof input === 'string' && input.trim().length) {
    try { return JSON.parse(input); } catch (_) { /* keep as string */ }
  }
  return input ?? fallback;
}

// Tool: list databases
server.registerTool(
  'listDatabases',
  {
    title: 'List Databases',
    description: 'Return databases available on the server.',
    inputSchema: z.object({}).optional(),
  },
  async () => {
    const admin = client.db('admin');
    const result = await admin.admin().listDatabases();
    return { content: [{ type: 'text', text: JSON.stringify(result.databases, null, 2) }] };
  }
);

// Tool: list collections for a database (default: connected db)
server.registerTool(
  'listCollections',
  {
    title: 'List Collections',
    description: 'List collections for a database. If dbName is omitted, uses the connected database.',
    inputSchema: z.object({ dbName: z.string().optional() }).optional(),
  },
  async ({ dbName } = {}) => {
    const targetDb = dbName ? client.db(dbName) : db;
    const cols = await targetDb.listCollections().toArray();
    return { content: [{ type: 'text', text: JSON.stringify(cols.map(c => c.name), null, 2) }] };
  }
);

// Tool: find documents (read-only)
server.registerTool(
  'find',
  {
    title: 'Find Documents',
    description: 'Run a find() query on a collection. Returns JSON results. Read-only.',
    inputSchema: z.object({
      collection: z.string(),
      filter: z.union([z.string(), z.record(z.any())]).optional(),
      projection: z.union([z.string(), z.record(z.any())]).optional(),
      sort: z.union([z.string(), z.record(z.any())]).optional(),
      limit: z.number().int().positive().max(1000).default(100),
      dbName: z.string().optional(),
    }),
  },
  async ({ collection, filter, projection, sort, limit, dbName }) => {
    const targetDb = dbName ? client.db(dbName) : db;
    const c = targetDb.collection(collection);
    const query = parseMaybeJson(filter, {});
    const proj = parseMaybeJson(projection, undefined);
    const srt = parseMaybeJson(sort, undefined);
    const cursor = c.find(query, { projection: proj, sort: srt, limit });
    const docs = await cursor.toArray();
    return { content: [{ type: 'text', text: JSON.stringify(docs, null, 2) }] };
  }
);

// Tool: aggregate (read-only)
server.registerTool(
  'aggregate',
  {
    title: 'Aggregate Pipeline',
    description: 'Run an aggregate() pipeline on a collection. Returns JSON results. Read-only.',
    inputSchema: z.object({
      collection: z.string(),
      pipeline: z.union([z.string(), z.array(z.any())]),
      dbName: z.string().optional(),
      allowDiskUse: z.boolean().optional(),
      maxTimeMS: z.number().int().positive().optional(),
    }),
  },
  async ({ collection, pipeline, dbName, allowDiskUse, maxTimeMS }) => {
    const targetDb = dbName ? client.db(dbName) : db;
    const c = targetDb.collection(collection);
    const agg = Array.isArray(pipeline) ? pipeline : parseMaybeJson(pipeline, []);
    const cursor = c.aggregate(agg, { allowDiskUse, maxTimeMS });
    const docs = await cursor.toArray();
    return { content: [{ type: 'text', text: JSON.stringify(docs, null, 2) }] };
  }
);

// Optional write tools (guarded by env)
if (ALLOW_WRITES) {
  server.registerTool(
    'insertOne',
    {
      title: 'Insert One',
      description: 'Insert a single document into a collection. Requires MCP_MONGODB_ALLOW_WRITES=true.',
      inputSchema: z.object({
        collection: z.string(),
        document: z.union([z.string(), z.record(z.any())]),
        dbName: z.string().optional(),
      }),
    },
    async ({ collection, document, dbName }) => {
      const targetDb = dbName ? client.db(dbName) : db;
      const c = targetDb.collection(collection);
      const doc = parseMaybeJson(document, {});
      const result = await c.insertOne(doc);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.registerTool(
    'updateOne',
    {
      title: 'Update One',
      description: 'Update a single document in a collection. Requires MCP_MONGODB_ALLOW_WRITES=true.',
      inputSchema: z.object({
        collection: z.string(),
        filter: z.union([z.string(), z.record(z.any())]),
        update: z.union([z.string(), z.record(z.any())]),
        upsert: z.boolean().optional(),
        dbName: z.string().optional(),
      }),
    },
    async ({ collection, filter, update, upsert, dbName }) => {
      const targetDb = dbName ? client.db(dbName) : db;
      const c = targetDb.collection(collection);
      const q = parseMaybeJson(filter, {});
      const u = parseMaybeJson(update, {});
      const result = await c.updateOne(q, u, { upsert });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.registerTool(
    'deleteOne',
    {
      title: 'Delete One',
      description: 'Delete a single document from a collection. Requires MCP_MONGODB_ALLOW_WRITES=true.',
      inputSchema: z.object({
        collection: z.string(),
        filter: z.union([z.string(), z.record(z.any())]),
        dbName: z.string().optional(),
      }),
    },
    async ({ collection, filter, dbName }) => {
      const targetDb = dbName ? client.db(dbName) : db;
      const c = targetDb.collection(collection);
      const q = parseMaybeJson(filter, {});
      const result = await c.deleteOne(q);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );
}

// Resource: dynamic find via URI (read-only)
// Usage example: mongo://posts?filter={"status":"published"}&limit=10
server.registerResource(
  'mongo-resource',
  new ResourceTemplate('mongo://{collection}', { list: undefined }),
  {
    title: 'MongoDB Query Resource',
    description: 'Fetch documents by collection using URI query params: filter, projection, sort, limit, dbName',
  },
  async (uri, { collection }) => {
    const params = new URL(uri).searchParams; // ensure URL instance
    const filter = parseMaybeJson(params.get('filter'), {});
    const projection = parseMaybeJson(params.get('projection'), undefined);
    const sort = parseMaybeJson(params.get('sort'), undefined);
    const limit = params.get('limit') ? Number(params.get('limit')) : 100;
    const dbName = params.get('dbName') || undefined;

    const targetDb = dbName ? client.db(dbName) : db;
    const c = targetDb.collection(collection);
    const cursor = c.find(filter, { projection, sort, limit });
    const docs = await cursor.toArray();
    return { contents: [{ uri: uri.href, text: JSON.stringify(docs, null, 2) }] };
  }
);

// Start stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);

// Graceful shutdown
async function shutdown() {
  try { await client.close(); } catch { /* ignore */ }
  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
