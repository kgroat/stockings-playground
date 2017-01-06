
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
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

const SCROLL_IGNORE_HEIGHT = 50;
export class MessageList extends React.Component<{}, {messages: Message[], showHasMessages: boolean}> {
  private _firstUpdate: boolean;
  private _scrolling: boolean;
  constructor(){
    super();
    this.state = { messages: [], showHasMessages: false };
    messageService.getAll().subscribe(messages => {
      this.setState({ messages: messages } as any);
    });
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.checkScroll = this.checkScroll.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }
  componentDidMount() {
    this._firstUpdate = true;
  }
  componentDidUpdate() {
    if(this._scrolling){
      this._scrolling = false;
      return;
    }
    var element = ReactDOM.findDOMNode(this);
    var elementIsScrolledNearBottom = element.scrollTop > element.scrollHeight - element.clientHeight - SCROLL_IGNORE_HEIGHT;
    if(this._firstUpdate || (elementIsScrolledNearBottom)){
      this.scrollToBottom();
    } else if(!this.state.showHasMessages) {
      this.setState({ showHasMessages: true } as any);
    }
    this._firstUpdate = false;
  }
  checkScroll(){
    var element = ReactDOM.findDOMNode(this);
    var elementIsScrolledNearBottom = element.scrollTop > element.scrollHeight - element.clientHeight - SCROLL_IGNORE_HEIGHT;
    if(elementIsScrolledNearBottom && this.state.showHasMessages){
      this._scrolling = true;
      this.setState({ showHasMessages: false } as any);
    }
  }
  scrollToBottom(){
    var element = ReactDOM.findDOMNode(this);
    element.scrollTop = element.scrollHeight;
    if(this.state.showHasMessages){
      this.setState({ showHasMessages: false } as any);
    }
  }
  getHasMessagesClassNames(){
    return classNames({
      hasMessages: true,
      show: this.state.showHasMessages
    });
  }
  render() {
    return (
      <div id="messages" onScroll={this.checkScroll}>
        {this.state.messages.map(msg => <MessageRow message={msg} key={msg.id}></MessageRow>)}
        <div id="messageFormFix"></div>
        <div className={this.getHasMessagesClassNames()} onClick={this.scrollToBottom}>&darr; New Messages &darr;</div>
      </div>
    );
  }
}