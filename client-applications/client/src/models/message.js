export class Message {
  id;
  message;
  fromPubkey;
  fromAlias;
  fromColor;
  lightningRequest;
  paymentConfirmed = false;
  createdDate;

  sender = '';

  constructor(data) {
    Object.assign(this, data);

    this.sender = this.fromAlias ? this.fromAlias : this.fromPubkey;
  }
  merge(message) {
    Object.assign(this, message);
  }
}
