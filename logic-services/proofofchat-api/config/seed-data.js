const graph = require('../graph.json');
const nodesService = require('../services/nodes');

async function seedData() {
  console.log('CREATING - Nodes - this may take a while depending on graph size');

  graph.nodes.forEach(node => {
    console.log('| - checking if exists...')
    nodesService.getByPubkey(node.pub_key).then(result => {
      if (!result) {
        console.log('| - did not exist, creating', node.pub_key)
        return nodesService.create(node);
      }
    });
  });
}

module.exports = seedData;
