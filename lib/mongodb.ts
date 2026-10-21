import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri && process.env.NODE_ENV === "production") {
  console.warn("MONGODB_URI is not configured; submissions will be unavailable.");
}

const globalForMongo = globalThis as unknown as { mongoClient?: MongoClient };

export async function getMongoClient() {
  if (!uri) return null;
  if (!globalForMongo.mongoClient) {
    globalForMongo.mongoClient = new MongoClient(uri);
    await globalForMongo.mongoClient.connect();
  }
  return globalForMongo.mongoClient;
}
