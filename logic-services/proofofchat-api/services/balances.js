const transactionsService = require('@coinmesh/bitcoind-adapter').transactionsService;

module.exports = {
  getByAddress
};

async function getByAddress(targetAddress) {
  const result = await transactionsService.getUnspentByAddress([targetAddress]);

  const unspentOutputs = result.result;

  let totalUnspentOutputs = 0;

  unspentOutputs
    .filter(unspentOutput => unspentOutput.spendable)
    .forEach(unspentOutput => {
      totalUnspentOutputs += unspentOutput.amount;
    });

  return totalUnspentOutputs;
}
