const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  message: { type: String, required: true },
  signature: { type: String, required: true },
  hiddenMessage:  { type: String, required: true },
  fromPubkey: { type: String, required: true },
  fromAlias: { type: String },
  fromColor: { type: String },
  channelCount: { type: String, required: true },
  lightningRequest: { type: String },
  invoiceId: { type: String },
  paymentConfirmed: { type: Boolean, default: false },
  type: { type: String, default: 'message' },
  createdDate: { type: Date, default: Date.now }
});

schema.set('toObject', { virtuals: true });
schema.set('toJSON', {
  virtuals: true,
  transform: (doc, message) => {
    delete message.signature;
    delete message.hiddenMessage;
    delete message.invoiceId;
    delete message.paymentConfirmed;
    delete message.lightningRequest;

    return message;
  }
});

schema.statics.getMessageByInvoiceId = function (invoiceId) {
  return this.findOne({invoiceId});
}

module.exports = mongoose.model('Message', schema);
