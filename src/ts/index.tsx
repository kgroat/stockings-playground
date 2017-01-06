
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MessageList } from './messageList';
import { MessageForm } from './messageForm';

ReactDOM.render(
  <div>
    <h1>Stockings Message Board</h1>
    <MessageList></MessageList>
    <MessageForm></MessageForm>
  </div>,
  document.getElementById('content')
);