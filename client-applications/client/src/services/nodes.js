import {HttpWrapper} from './http-wrapper';
import {Node} from '../models/node';
import {DataStore} from './data-store';
import environment from '../environment';

export class NodesService {
  webSocket;

  static inject = [HttpWrapper, DataStore];
  constructor(http, dataStore) {
    this.http = http;
    this.dataStore = dataStore;
  }
  getTopNodes() {
    const url = `/nodes/top`;

    return this.http.get(url).then(nodes => {
      return nodes.map(node => new Node(node));
    });
  }
  subscribe() {
    if (this.webSocket) {
      return this.webSocket;
    }

    this.webSocket = new WebSocket(environment.webSocketServerUrl);

    this.webSocket.onmessage = (event) => {
      const data = event.data;

      if (data && (typeof data === 'string')) {
        const item = JSON.parse(data);

        if (item.type === 'node') {
          this.dataStore.updateNode(item);
        }
      }
    };
    return this.webSocket;
  }
  unsubscribe() {
    this.webSocket.close();
  }
}
