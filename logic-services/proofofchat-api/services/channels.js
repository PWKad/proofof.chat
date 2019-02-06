const db = require('../config/db');
const Channel = db.Channel;
const channelsService = require('@coinmesh/lnd-adapter').channelsService;

module.exports = {
  connectChannelToCurrentUser,
  create,
  getAll,
  getById,
  update,
  getByPubkey,
  delete: _delete
};

async function getAll() {
  let dbChannels = await Channel.find().select('-hash');

  const result = await channelsService.getChannels();
  const channels = result.channels;

  let finalChannels = [];
  let promises = [];

  channels.forEach(channel => {
    const match = dbChannels.find(dbChannel => dbChannel.channelId.toString() === channel.id.toString());

    if (match) {
      finalChannels.push(match);
    } else {
      let promise = createDbChannel(channel).then(newChannel => {
        finalChannels.push(newChannel);
      });
      promises.push(promise);
    }
  });

  await Promise.all(promises);

  return finalChannels;
}

async function getById(id) {
  return await Channel.findById(id);
}

async function getByPubkey(pubkey) {
  return await Channel.findOne({'policies.public_key': pubkey});
}

async function connectChannelToCurrentUser() {
  const currentUser = await getCurrent();

  const channelParam = {
    amount: 100000,
    publicKey: currentUser.wallet.lightningPubkey
  };

  return await create(channelParam);
}

async function create(channelParam) {
  const {
    amount, publicKey
  } = channelParam;

  const result = await channelsService.openChannel(publicKey, amount);

  return await createDbChannel(result);
}

async function createDbChannel(lndChannelObject) {
  lndChannelObject.channelId = lndChannelObject.id;
  delete lndChannelObject.id;

  const channel = new Channel(lndChannelObject);

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

  await channelsService.closeChannel(channel.channelId);

  return true;
}
