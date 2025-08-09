import { MongoClient, Db } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _ussMongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_USS_URI || process.env.MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_USS_URI or MONGODB_URI in environment variables");

const dbName = process.env.MONGODB_USS_DB || process.env.MONGODB_DB;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._ussMongoClientPromise) {
    client = new MongoClient(uri);
    global._ussMongoClientPromise = client.connect();
  }
  clientPromise = global._ussMongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;

export async function getUssDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}
