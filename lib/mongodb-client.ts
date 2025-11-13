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

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV !== "production") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(getUri());
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(getUri());
  clientPromise = client.connect();
}

export default clientPromise;
