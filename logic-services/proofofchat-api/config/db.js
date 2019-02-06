const config = require('../config.json');
const mongoose = require('mongoose');

mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
  Channel: require('../models/channel'),
  Invoice: require('../models/invoice'),
  Message: require('../models/message'),
  Node: require('../models/node'),
  Peer: require('../models/peer')
};
