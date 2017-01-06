
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as LinkedStateMixin from 'react-addons-linked-state-mixin';

LinkedStateMixin.linkState
import { client } from './client';
import { Message } from './message';

export class MessageForm extends React.Component<{}, {body: string}> {
  constructor(){
    super();
    this.submit = this.submit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }
  state = { body: '' };
  submit(ev?: React.FormEvent<HTMLFormElement>) {
    if(ev){
      ev.preventDefault();
    }
    client.request<Message[]>({
      url: '/api/message/',
      method: 'POST',
      body: { body: this.state.body }
    }).subscribe();
    this.setState({ body: '' });
  }
  handleEnter(ev: React.KeyboardEvent<HTMLTextAreaElement>) {
    if(ev.key === 'Enter' && !ev.shiftKey){
      ev.preventDefault();
      this.submit();
    }
  }
  changeHandler(name: string){
    return (ev) => {
      this.state[name] = ev.target.value;
      this.setState(this.state);
    }
  }
  linkState = LinkedStateMixin.linkState;
  render() {
    return (
      <form id="messageForm" onSubmit={this.submit}>
        <textarea className="messageBox" value={this.state.body} onChange={this.changeHandler('body')} onKeyPress={this.handleEnter}></textarea>
        <button className="messageSubmit" type="submit">Submit</button>
      </form>
    );
  }
};