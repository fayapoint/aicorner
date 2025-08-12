import { MongoClient, Db } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _ussMongoClientPromise: Promise<MongoClient> | undefined;
}

// Don't throw during module loading - defer until actual usage
const getUri = () => {
  let uri = process.env.MONGODB_USS_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.warn("Missing MONGODB_USS_URI or MONGODB_URI in environment variables");
    // Return a placeholder URI that won't break build but will fail at runtime if actually used
    return "mongodb://localhost:27017/placeholder";
  }
  
  // Ensure the URI has a valid MongoDB scheme
  if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    console.warn("MongoDB URI missing scheme, adding default mongodb:// prefix");
    uri = `mongodb://${uri}`;
  }
  
  return uri;
};

const dbName = process.env.MONGODB_USS_DB || process.env.MONGODB_DB;

let clientPromise: Promise<MongoClient>;

function getClientPromise(): Promise<MongoClient> {
  if (process.env.NODE_ENV === "development") {
    if (!global._ussMongoClientPromise) {
      const client = new MongoClient(getUri());
      global._ussMongoClientPromise = client.connect();
    }
    return global._ussMongoClientPromise;
  } else {
    const client = new MongoClient(getUri());
    return client.connect();
  }
}

// Lazy initialization - only connect when actually needed
clientPromise = getClientPromise();

export default clientPromise;

export async function getUssDb(): Promise<Db> {
  try {
    const client = await clientPromise;
    return client.db(dbName);
  } catch (error) {
    console.error("Failed to connect to USS database:", error);
    throw error;
  }
}
