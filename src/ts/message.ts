
import { client } from './client';

export interface Message {
  _id: string;
  body: string;
  time: Date;
}

export const messageService = {
  getAll() {
    return client.request<Message[]>({
      url: '/api/message/',
      method: 'GET'
    }).map(messages => {
      messages.forEach(msg => {
        msg.time = new Date(msg.time)
      });
      return messages;
    });
  },
  post(message: string) {
    return client.request<Message>({
      url: '/api/message/',
      method: 'POST',
      body: { body: message }
    });
  }
};