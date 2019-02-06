const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  bytes_received: { type: String, required: true },
  bytes_sent: { type: String, required: true },
  is_inbound: { type: String, required: true },
  ping_time: { type: String, required: true },
  public_key: { type: String, required: true },
  socket: { type: String, required: true },
  tokens_received: { type: String, required: true },
  tokens_sent: { type: String, required: true },
  type: { type: String, required: true },
  archived: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now }
});

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Peer', schema);
