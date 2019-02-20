const express = require('express');
const router = express.Router();
const nodesService = require('../services/nodes');

router.get('/top', async (req, res, next) => {
  const result = await nodesService.getTop();

  return res.json(result);
});

router.get('/:pubkey', async (req, res, next) => {
  const pubkey = req.params.pubkey;

  const result = await nodesService.getByPubkey(pubkey);

  return res.json(result);
});

router.patch('/update/:id', async (req, res, next) => {
  const node = req.body.node;
  const signature = req.body.signature;

  try {
    const result = await nodesService.create(node, signature);
    return res.json({ request: result.lightningRequest });
  } catch (error) {
    return res.status(401).send({node: 'Unable to validate signature / node.'});
  }
});

module.exports = router;
