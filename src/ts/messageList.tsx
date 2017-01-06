
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Observable } from 'rxjs/Rx';

import { Message, messageService } from './message';

class MessageRow extends React.Component<{message: Message}, Message> {
  constructor(props: {message: Message}){
    super(props);
    this.state = props.message;
  }
  render(){
    var splitBody = this.state.body.split('\n');
    var bodyWithLineBreaks = splitBody.map((line, i) => <p key={i}>{line}</p>);
    return (
      <div className="message">
        <span className="time">{this.state.time.toLocaleString()}</span>
        <span className="body">{bodyWithLineBreaks}</span>
      </div>
    );
  }
}

export class MessageList extends React.Component<{}, {messages: Message[]}> {
  constructor(){
    super();
    this.state = { messages: [] };
    messageService.getAll().subscribe(messages => {
      this.setState({ messages: messages });
    });
  }
  render() {
    return (
      <div id="messages">
        {this.state.messages.map(msg => <MessageRow message={msg} key={msg.id}></MessageRow>)}
        <div id="messageFormFix"></div>
      </div>
    );
  }
}