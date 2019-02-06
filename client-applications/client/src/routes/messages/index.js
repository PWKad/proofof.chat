import {bindable} from 'aurelia-framework';
import {MessagesService} from '../../services/messages';
import {DataStore} from '../../services/data-store';
import {Invoice} from '../../models/invoice';

export class Index {
  @bindable messages = [];
  @bindable error = '';
  showCurrentInvoice = false;

  static inject = [MessagesService, DataStore];
  constructor(messagesService, dataStore) {
    this.messagesService = messagesService;
    this.dataStore = dataStore;
  }
  attached() {
    return this.messagesService.getMessages().then(messages => {
      this.dataStore.messages = messages;
       this.messagesService.subscribe();
    });
  }
  submit() {
    return this.messagesService.sendMessage(this.message, this.signature).then(result => {
      this.messages.push(result);
    }).catch(result => {
      this.error = result.content.message;
    });
  }
  showInvoice(message) {
    this.currentInvoice = new Invoice({
      request: message.lightningRequest
    });
    this.showCurrentInvoice = true;
  }
  closeModal() {
    this.showCurrentInvoice = false;
  }
}
