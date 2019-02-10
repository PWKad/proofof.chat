const db = require('../config/db');
const Node = db.Node;

module.exports = {
  getAll,
  getById,
  getByPubkey,
  getTop,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await Node.find().select('-hash');
}

async function getById(id) {
  return await Node.findById(id);
}

async function getByPubkey(pubkey) {
  return await Node.findOne({pub_key: pubkey});
}

async function getTop() {
  return await this.getAll();
  return await Node.find({capacity: {$gte: 0}}).select('-hash').limit(10);
}

async function create(nodeParams) {
  const node = new Node(nodeParams);

  await node.save();

  return node;
}

async function update(id, nodeParam) {
  const node = await Node.findById(id);

  if (!node) throw 'Node not found';

  Object.assign(node, nodeParam);

  await node.save();

  return node;
}

async function _delete(id) {
  const node = await Node.findById(id);

  if (!node) throw 'Node not found';

  node.archived = true;

  await node.save();

  await nodesService.removeNode(node.public_key);

  return true;
}
