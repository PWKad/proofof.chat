const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  description: { type: String, required: true },
  include_address: { type: String },
  tokens: { type: String, required: true },
  chain_address: { type: String },
  confirmed_at: { type: Date },
  created_at: { type: Date, required: true },
  description_hash: { type: String },
  expires_at: { type: Date },
  is_confirmed: { type: Boolean },
  is_outgoing: { type: Boolean },
  type: { type: String, required: true },
  request: { type: String },
  secret: { type: String },
  createdDate: { type: Date, default: Date.now },
  createdById: { type: Schema.Types.ObjectId, required: true },
  status: { type: String, required: true },
  invoiceId: { type: String, required: true },
  quotedRate: { type: String },
  originalCurrency: { type: String, required: true, default: 'usd' },
  listing: { type: Schema.Types.ObjectId, ref: 'Listing' }
});

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Invoice', schema);
