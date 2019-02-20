import {bindable} from 'aurelia-framework';
import {MessagesService} from '../../services/messages';
import {NodesService} from '../../services/nodes';
import {DataStore} from '../../services/data-store';
import {Invoice} from '../../models/invoice';

export class Index {
  @bindable error = '';
  showCurrentInvoice = false;

  static inject = [MessagesService, NodesService, DataStore];
  constructor(messagesService, nodesService, dataStore) {
    this.messagesService = messagesService;
    this.nodesService = nodesService;
    this.dataStore = dataStore;
  }
  attached() {
    if (this.dataStore.messages.length !== 0) {
      return;
    }
    return this.messagesService.getMessages().then(messages => {
      this.dataStore.messages = messages;
      this.messagesService.subscribe();
    });
  }
  submit() {
    return this.messagesService.sendMessage(this.message, this.signature).then(result => {
      this.showInvoice(result.request);
    }).catch(result => {
      this.error = result.content.message;
    });
  }
  showInvoice(request) {
    this.currentInvoice = new Invoice({
      request
    });
    this.showCurrentInvoice = true;
  }
  closeModal() {
    this.showCurrentInvoice = false;
  }
  showNodeDetails(pubkey) {
    return this.nodesService.getNodeByPubkey(pubkey).then(node => {
      this.selectedNode = node;
    });
  }
  closeNodeDetails() {
    this.selectedNode = null;
  }
}
