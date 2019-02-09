const graph = require('../graph.json');
const nodesService = require('../services/nodes');

async function seedData() {
  console.log('CREATING - Nodes - this may take a while depending on graph size');

  getNetworkGraph().then(result => {
    console.log(result);
    result.channels.forEach(channel => {
      channelsService.getByChannelId(channel.id).then(result => {
        if (!result) {
          console.log('| - did not exist, creating', node.pub_key)
          return channelsService.create(node);
        }
      });
    });
  });
  // graph.nodes.forEach(node => {
  //   console.log('| - checking if exists...')
  //   nodesService.getByPubkey(node.pub_key).then(result => {
  //     if (!result) {
  //       console.log('| - did not exist, creating', node.pub_key)
  //       return nodesService.create(node);
  //     }
  //   });
  // });
}

module.exports = seedData;
