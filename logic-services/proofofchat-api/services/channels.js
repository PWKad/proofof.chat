const db = require('../config/db');
const Channel = db.Channel;

module.exports = {
  connectChannelToCurrentUser,
  create,
  getAll,
  getById,
  getByChannelId,
  update,
  getByPubkey,
  delete: _delete
};

async function getAll() {
  return await Channel.find().select('-hash');
}

async function getById(id) {
  return await Channel.findById(id);
}

async function getByChannelId(channelId) {
  return await Channel.findOne({channelId});
}

async function create(channelParams) {
  channelParams.channelId = channelParams.id;
  delete channelParams.id;

  const channel = new Channel(channelParams);

  await channel.save();

  return channel;
}

async function update(id, channelParam) {
  const channel = await Channel.findById(id);

  if (!channel) throw 'Channel not found';

  Object.assign(channel, channelParam);

  await channel.save();

  return channel;
}

async function _delete(id) {
  const channel = await Channel.findById(id);

  if (!channel) throw 'Channel not found';

  channel.archived = true;

  await channel.save();

  return true;
}
