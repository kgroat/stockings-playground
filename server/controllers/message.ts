import * as express from 'express';
import { ObjectID } from 'mongodb';
import { Request, Response } from 'express-stockings';
import * as catcher from 'async-catcher';

import { Message, MessageService } from '../services/messageService'

export var messageRouter: express.Router = express.Router();

const MESSAGE_MESSAGE_ID = 'message';
const NEW_MESSAGE_MESSAGE_ID = 'message:new';
const EDIT_MESSAGE_PREFIX = 'message:';

messageRouter.get('/', catcher(async (req: Request, res: Response) => {
  var messages = await MessageService.getMessages();

  res.subscribe(NEW_MESSAGE_MESSAGE_ID, (a,b) => { a.push(b); });
  res.json(messages);
}));

messageRouter.get('/after/:time', catcher(async (req: Request, res: Response) => {
  var notBefore = new Date(req.params.time);
  if(isNaN(notBefore.getTime())){
    res.sendStatus(400).send('invalid time');
    return;
  }

  var messages = await MessageService.getMessages(notBefore);
  res.json(messages);
}));

messageRouter.post('/', catcher(async (req: Request, res: Response) => {
  var message = await MessageService.addMessage({
    body: req.body.body,
    time: new Date()
  });

  res.broadcast(NEW_MESSAGE_MESSAGE_ID, message);
  res.send(message);
}));