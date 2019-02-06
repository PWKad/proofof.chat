const db = require('../config/db');
const Peer = db.Peer;
const peersService = require('@coinmesh/lnd-adapter').peersService;
const { getCurrent } = require('../helpers/utils');

module.exports = {
  connectPeerToCurrentUser,
  getAll,
  getById,
  getByPubkey,
  getStatusByPubkey,
  create,
  update,
  delete: _delete
};

// TODO: Big method
async function getAll() {
  let dbPeers = await Peer.find().select('-hash');

  const result = await peersService.getPeers();
  const peers = result.peers;

  let finalPeers = [];
  let promises = [];

  peers.forEach(peer => {
    const match = dbPeers.find(dbPeer => dbPeer.public_key.toString() === peer.public_key.toString());

    if (match) {
      finalPeers.push(match);
    } else {
      console.error('No match found, creating a new peer.');
      let promise = createDbPeer(peer);

      promise.then(newPeer => {
        finalPeers.push(newPeer);
      });
      promises.push(promise);
    }
  });

  await Promise.all(promises);
  return finalPeers;
}

async function getById(id) {
  return await Peer.findById(id);
}

async function getByPubkey(pubkey) {
  return await Peer.findOne({public_key: pubkey});
}

async function getStatusByPubkey(pubkey) {
  const peer = await Peer.findOne({public_key: pubkey});

  return !!peer ? peer.ping_time : 'not connected';
}

async function connectPeerToCurrentUser() {
  const currentUser = await getCurrent();

  const publicKey = currentUser.wallet.lightningPubkey;
  const socket = currentUser.wallet.lightningSocket;

  const peer = await getByPubkey(publicKey);

  if (peer) {
    return peer;
  }

  const peerParam = {
    socket,
    publicKey
  };

  return await create(peerParam);
}

async function create(peerParam) {
  const {
    socket, publicKey
  } = peerParam;

  let result = await peersService.addPeer(socket, publicKey);

  return await createDbPeer(result);
}

async function createDbPeer(peerParams) {
  const peer = new Peer(peerParams);
  
  await peer.save();

  return peer;
}

async function update(id, peerParam) {
  const peer = await Peer.findById(id);

  if (!peer) throw 'Peer not found';

  Object.assign(peer, peerParam);

  await peer.save();

  return peer;
}

async function _delete(id) {
  const peer = await Peer.findById(id);

  if (!peer) throw 'Peer not found';

  peer.archived = true;

  await peer.save();

  await peersService.removePeer(peer.public_key);

  return true;
}
