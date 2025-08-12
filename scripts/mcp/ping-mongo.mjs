import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load .env.local first (Next.js style), then fallback to .env if present
try {
  const cwd = process.cwd();
  const envLocal = path.join(cwd, '.env.local');
  if (fs.existsSync(envLocal)) {
    // dotenv/config already loaded above, but we want .env.local precedence
    // Re-parse .env.local manually to ensure precedence over .env
    const res = dotenv.config({ path: envLocal, override: true });
    if (res.error) {
      // Ignore parsing error, rely on existing process.env
    }
  }
} catch {}

function getMongoUri() {
  const uri = process.env.MONGODB_URI || process.env.MONGODB_USS_URI;
  if (!uri) throw new Error('MONGODB_URI or MONGODB_USS_URI must be set');
  return uri;
}

async function main() {
  const uri = getMongoUri();
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
  });
  try {
    const start = Date.now();
    await client.connect();
    const admin = client.db().admin();
    const ping = await admin.command({ ping: 1 });
    const ms = Date.now() - start;
    console.log('[PING] MongoDB ping ok:', JSON.stringify(ping), `(${ms}ms)`);
    process.exit(0);
  } catch (err) {
    console.error('[PING] MongoDB ping failed:', err?.message || err);
    process.exit(1);
  } finally {
    try { await client.close(); } catch {}
  }
}

main();
