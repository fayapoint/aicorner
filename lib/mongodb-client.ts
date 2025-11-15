import { MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
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

let clientPromise: Promise<MongoClient> | null = null;

function getClientPromise(): Promise<MongoClient> {
  // True lazy initialization - only create connection when first accessed
  if (!clientPromise) {
    if (process.env.NODE_ENV !== "production") {
      if (!global._mongoClientPromise) {
        const client = new MongoClient(getUri());
        global._mongoClientPromise = client.connect();
      }
      clientPromise = global._mongoClientPromise;
    } else {
      const client = new MongoClient(getUri());
      clientPromise = client.connect();
    }
  }
  return clientPromise;
}

// Export the promise (NextAuth MongoDB adapter expects a Promise, not a function)
// But we defer the actual connection until the promise is first awaited
export default new Proxy({} as Promise<MongoClient>, {
  get(target, prop) {
    const promise = getClientPromise();
    const value = (promise as any)[prop];
    if (typeof value === "function") {
      return value.bind(promise);
    }
    return value;
  }
}) as Promise<MongoClient>;
