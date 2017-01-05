
import { Client, Request } from 'stockings-client';
import * as $ from 'jquery';

var messageTemplate = (function(){
  var tmpl = $('#messageTemplate')[0].innerHTML;
  return function messageTemplate(message: Message): string {
    return tmpl.replace(/\{\{time\}\}/g, message.time.toLocaleTimeString())
               .replace(/\{\{body\}\}/g, message.body);
  };
})();

var client = new Client({
  waitUntilToken: true
});

var messageTmpl = $('#messageTemplate').html();
var messageArea = $('#messages');
var messageForm = $('#messageForm');

interface Message {
  id: string;
  body: string;
  time: Date;
}

var test = client.request<Message[]>({
  url: 'http://localhost:3000/api/message/',
  method: 'GET'
}).map(msgs => {
  msgs.forEach(msg => {
    msg.time = new Date(msg.time)
    msg.body = msg.body.replace(/\n/g, '<br/>');
  });
  return msgs;
});

console.log('got here');

test.subscribe(messages => {
  var allMessagesHtml = messages.reduce((html, message) => {
    return html + messageTemplate(message);
  }, '');
  messageArea.html(allMessagesHtml);
});

messageForm.keypress(ev => {
  if(ev.keyCode === 13 && !ev.shiftKey){
    ev.preventDefault();
    messageForm.submit();
  }
})

messageForm.submit(ev => {
  ev.preventDefault();
  var body = messageForm.find('.messageBox').val();
  if(!body){
    return;
  }
  client.request<Message[]>({
    url: 'http://localhost:3000/api/message/',
    method: 'POST',
    body: { body: body }
  }).subscribe();
  messageForm.find('.messageBox').val('');
})