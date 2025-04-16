import mongoose from "mongoose";

export async function getMongoConnection(): Promise<mongoose.Connection> {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/slotdb";
  const mongooseInstance = await mongoose.connect(uri, {
    autoIndex: false
  });
  return mongooseInstance.connection;
}
