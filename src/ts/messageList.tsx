
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Observable } from 'rxjs/Rx';

import { client } from './client';
import { Message } from './message';

interface MessageRowProps {
  message: Message;
}

class MessageRow extends React.Component<MessageRowProps, Message> {
  constructor(props: MessageRowProps){
    super(props);
    this.state = props.message;
  }
  addLineBreaks(body: string){

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
    this.getMessages().subscribe(messages => {
      this.setState({ messages: messages });
    });
  }
  getMessages() {
    return client.request<Message[]>({
      url: '/api/message/',
      method: 'GET'
    }).map(messages => {
      messages.forEach(msg => {
        msg.time = new Date(msg.time)
      });
      return messages;
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