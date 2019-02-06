const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  capacity: { type: String },
  transaction_id: { type: String },
  transaction_vout: { type: String },
  channelId: { type: String, required: true },
  policies: [{
    base_fee_mtokens: { type: String },
    cltv_delta: { type: String },
    fee_rate: { type: String },
    is_disabled: { type: String },
    min_htlc_mtokens: { type: String },
    public_key: { type: String }
  }],
  archived: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now }
});

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Channel', schema);
