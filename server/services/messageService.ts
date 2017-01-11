
import { ObjectID } from 'mongodb';
import { getDatabase } from '../database';

export interface Message {
  _id?: ObjectID;
  body: string;
  time: Date;
}

async function getCollection() {
  var database = await getDatabase();
  return database.collection('message');
}

export const MessageService = {
  async getMessages(notBefore?: Date): Promise<Message[]> {
    const MESSAGE_LIMIT = 50;
    var collection = await getCollection();
    var query: any = {};
    if(notBefore){
      query.time = { $lt: notBefore };
    }
    var messages = await collection.find(query).sort({ 'time': -1 }).limit(MESSAGE_LIMIT).toArray() as Message[];
    return messages;
  },
  async addMessage(message: Message): Promise<Message> {
    var collection = await getCollection();
    var result = await collection.insertOne(message);
    message._id = result.insertedId;
    return message;
  }
}