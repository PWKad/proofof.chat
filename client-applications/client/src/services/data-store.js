import {Message} from '../models/message';

export class DataStore {
  nodes = [];
  messages = [];

  addNode(node) {
    this.nodes.push(node);
  }
  addMessage(message) {
    this.messages.push(message);
  }
  removeNode(node) {
    const index = this.nodes.indexOf(node);

    if (index > -1) {
      this.nodes.splice(index, 1);
    }
  }
  removeMessage(message) {
    const index = this.messages.indexOf(message);

    if (index > -1) {
      this.messages.splice(index, 1);
    }
  }
  getNodeById(id) {
    return this.nodes.find(node => node.id === id);
  }
  getMessageById(id) {
    return this.messages.find(message => message.id === id);
  }
  updateMessage(updatedMessage) {
    const message = this.getMessageById(updatedMessage.id);

    if (message) {
      message.merge(updatedMessage);
    } else {
      this.addMessage(new Message(updatedMessage));
    }
  }
}
