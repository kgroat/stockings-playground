import { MongoClient, Db } from 'mongodb';

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/playground';

var instance: Db;

export async function getDatabase(): Promise<Db> {
  if(!instance){
    instance = await MongoClient.connect(mongoUrl);
  }
  return instance;
}