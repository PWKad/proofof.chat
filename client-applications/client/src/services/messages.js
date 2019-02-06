import {HttpWrapper} from './http-wrapper';
import {Message} from '../models/message';
import {DataStore} from './data-store';
import environment from '../environment';

export class MessagesService {
  webSocket;

  static inject = [HttpWrapper, DataStore];
  constructor(http, dataStore) {
    this.http = http;
    this.dataStore = dataStore;
  }
  sendMessage(message, signature) {
    const url = `/messages`;
    const body = { message, signature };

    return this.http.post(url, body);
  }
  getMessages() {
    const url = `/messages`;

    return this.http.get(url).then(messages => {
      return messages.map(message => new Message(message));
    });
  }
  subscribe() {
    if (this.webSocket) {
      return this.webSocket;
    }

    this.webSocket = new WebSocket(environment.webSocketServerUrl);

    this.webSocket.onmessage = (event) => {
      console.log('Message from server ', event);
      // socket.on('message', data => {
      //   console.log('data incoming')
      //   console.log(data)
      //   if (data) {
      //     this.dataStore.updateMessage(data)
      //   }
      // });
    };
    this.webSocket.addEventListener('error', (event) => {
      console.log('Message from server ', event);
    });
    this.webSocket.addEventListener('status', (event) => {
      console.log('Message from server ', event);
    });
    this.webSocket.addEventListener('end', (event) => {
      console.log('Message from server ', event);
    });
    return this.webSocket;
  }
  unsubscribe() {

  }
}
