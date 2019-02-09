const db = require('../config/db');
const GraphUpdate = db.GraphUpdate;

module.exports = {
  getAll,
  create
};

async function getAll() {
  return await GraphUpdate.find().select('-hash');
}

async function create(entry) {
  const newGraphUpdate = new GraphUpdate(entry);

  await newGraphUpdate.save();

  return newGraphUpdate;
}
