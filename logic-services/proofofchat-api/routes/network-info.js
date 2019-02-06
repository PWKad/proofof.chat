const express = require('express');
const router = express.Router();
const networkInfoService = require('@coinmesh/lnd-adapter').networkInfoService;
const walletInfoService = require('@coinmesh/lnd-adapter').walletInfoService;

router.get('/', async (req, res, next) => {
  let results = {};

  const networkInfo = await networkInfoService.getNetworkInfo();
  results.networkInfo = networkInfo;

  const walletInfo = await walletInfoService.getWalletInfo();
  results.walletInfo = { public_key: walletInfo.public_key };

  const nodeInfo = await networkInfoService.getNodeInfo(walletInfo.public_key);
  results.nodeInfo = nodeInfo;

  return res.json(results);
});

module.exports = router;
