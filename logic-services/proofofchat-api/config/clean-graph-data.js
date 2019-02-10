const graph = require('../graph.json');
const nodesService = require('../services/nodes');
const fs = require('fs');
const networkInfoService = require('@coinmesh/lnd-adapter').networkInfoService;

async function cleanGraphData() {
  console.log('starting now')
  let tempLinks = graph.edges.map(channel => {
    return { source: channel.node1_pub, target: channel.node2_pub };
  });

  const finalResult = Object.assign({}, graph);
  delete finalResult.edges;
  finalResult.links = tempLinks;
  console.log('created links')
  console.log(finalResult.links.length)
  console.log(finalResult.nodes.length)
  const json = JSON.stringify(finalResult);
  console.log('writing')
  fs.writeFile('../../node-graph.json', json, 'utf8', () => {
    console.log('written')
  });

//   networkInfoService.getNetworkGraph().then(result => {
//     console.log('starting now')
//     let tempLinks = result.channels.map(channel => {
//       return { source: channel.policies[0].public_key, target: channel.policies[1].public_key };
//     });

// console.log('created links')
// console.log(tempLinks[0])
//     const finalResult = result;
//     delete finalResult.edges;
//     finalResult.links = tempLinks;
//     const json = JSON.stringify(finalResult);
// console.log('writing')
//     fs.writeFile('node-graph.json', json, 'utf8', () => {
//     console.log('written')
//     });
  // });
}

module.exports = cleanGraphData;
