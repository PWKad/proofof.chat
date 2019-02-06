const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  pub_key: { type: String },
  alias: { type: String },
  capacity: { type: String },
  channel_count: { type: String },
  color: { type: String },
  sockets: [{
    socket: { type: String },
    type: { type: String }
  }],
  addresses: [{
    network: { type: String },
    addr: { type: String }
  }],
  updated_at: { type: String },
  messageCount: { type: Number, default: 0, required: true },
  createdDate: { type: Date, default: Date.now }
});

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Node', schema);
