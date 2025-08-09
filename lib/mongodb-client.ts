import { MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Prefer USS users DB if provided (integration), else fall back to main app DB
const uri = process.env.MONGODB_USS_URI || process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_USS_URI or MONGODB_URI in environment variables");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV !== "production") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
