
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MessageList } from './messageList';
import { MessageForm } from './messageForm';

ReactDOM.render(
  <div>
    <h1 id="header">Stockings Message Board</h1>
    <MessageList></MessageList>
    <MessageForm></MessageForm>
  </div>,
  document.getElementById('content')
);