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
  lightningRequest: { type: String, required: true },
  paymentConfirmed: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now }
});

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Template', schema);
