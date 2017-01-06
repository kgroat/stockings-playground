import * as express from 'express';
import { Request, Response } from 'express-stockings';

export var messageRouter: express.Router = express.Router();

const MESSAGE_MESSAGE_ID = 'message';
const NEW_MESSAGE_MESSAGE_ID = 'message:new';
const EDIT_MESSAGE_PREFIX = 'message:';

const HEX_RADIX = 16;
const EIGHT_HEX_MAX = Math.pow(HEX_RADIX, 8);

interface Message {
  id: string;
  body: string;
  time: Date;
}

const messages: Message[] = [];

function getEightHexDigits() {
  var int = Math.floor(Math.random() * EIGHT_HEX_MAX);
  return int.toString(HEX_RADIX);
}

function generateId() {
  var output = '';
  for(var i=0; i<4; i++){
    output += getEightHexDigits();
  }
  return output;
}

messageRouter.get('/', (req: Request, res: Response) => {
  res.subscribe(NEW_MESSAGE_MESSAGE_ID, (a,b) => { a.push(b); return a; });
  res.json(messages);
});

messageRouter.get('/:id', (req: Request, res: Response) => {
  var id = req.param('id');
  var message: Message = messages.find(m => m.id === id);
  if(!message){
    res.sendStatus(404).send(null);
    return;
  }
  res.subscribe(`${EDIT_MESSAGE_PREFIX}${message.id}`);
  res.json(messages);
});

messageRouter.post('/', (req: Request, res: Response) => {
  var message: Message = {
    id: generateId(),
    body: req.body.body,
    time: new Date()
  };
  messages.push(message);
  if(messages.length > 50){
    messages.splice(0, 1);
  }
  
  res.broadcast(MESSAGE_MESSAGE_ID, messages);
  res.broadcast(NEW_MESSAGE_MESSAGE_ID, message);
  res.subscribe(`${EDIT_MESSAGE_PREFIX}${message.id}`);

  res.send(message);
});

messageRouter.put('/:id', (req: Request, res: Response) => {
  var id = req.param('id');
  var message: Message = messages.find(m => m.id === id);
  if(!message){
    res.sendStatus(404).send(null);
    return;
  }
  message.body = req.body.body;
  message.time = new Date();
  res.broadcast(MESSAGE_MESSAGE_ID, messages);
  res.broadcast(`${EDIT_MESSAGE_PREFIX}${message.id}`, message);
  res.send(message);
});