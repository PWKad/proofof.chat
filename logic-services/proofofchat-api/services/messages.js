const db = require('../config/db');
const Message = db.Message;
const cryptoService = require('@coinmesh/lnd-adapter').cryptoService;
const invoicesService = require('@coinmesh/lnd-adapter').invoicesService;
const nodesService = require('./nodes');

module.exports = {
  getAll,
  getLatest,
  getById,
  create,
  update
};

async function getAll() {
  return await Message.find().select('-hash');
}

async function getLatest() {
  const fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(fiveDaysAgo.getDate()-5);
  const messages = await Message.findOne();
  return await Message.find({createdDate: {$gte: fiveDaysAgo}}).select('-hash');
}

async function getById(id) {
  return await Message.findById(id);
}

async function create(message, signature) {
  const result = await cryptoService.verifyMessage(message, signature);

  if (!result || !result.signed_by) {
    throw new Error('Unable to verify message sender.');
  }
  const pubkey = result.signed_by;

  const node = await nodesService.getByPubkey(pubkey);

  if (!node) {
    throw new Error('Node not found in graph for some reason (impossible).');
  }

  node.messageCount += 1;
  await node.save();

  const messagesLastFiveDays = await getLatest();

  const tokens = node.messageCount + messagesLastFiveDays.length;

  const invoiceRequest = {
    description: `${pubkey}:${node.messageCount}`,
    tokens
  };

  let invoice = await invoicesService.createInvoice(invoiceRequest);

  const messageParams = {
    message: 'Pay invoice to finish post',
    signature,
    hiddenMessage: message,
    fromPubkey: pubkey,
    fromAlias: node.alias,
    fromColor: node.color,
    channelCount: node.channel_count || 0,
    lightningRequest: invoice.request
  };
  const newMessage = new Message(messageParams);

  await newMessage.save();

  return newMessage;
}

async function update(id, messageParam) {
  const message = await Message.findById(id);

  if (!message) throw 'Message not found';

  Object.assign(message, messageParam);

  await message.save();

  return message;
}
