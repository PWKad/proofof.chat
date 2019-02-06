const express = require('express');
const router = express.Router();
const exchangeRatesService = require('@coinmesh/bitcoind-adapter').exchangeRatesService;
const client = require('../services/redis-wrapper');

router.get('/:pair', async (req, res, next) => {
  const currencyPair = req.params.pair;

  const redisKey = `proofofchat:exchange-rate:${currencyPair}`;
  const cachedValue = await client.getAsync(redisKey);

  if (cachedValue) {
    return res.json(JSON.parse(cachedValue));
  }

  const result = await exchangeRatesService.getExchangeRate(currencyPair).catch(error => next(error));

  const returnValue = result.data;

  await client.setAsync(redisKey, JSON.stringify(returnValue), 'EX', 60);

  return res.json(returnValue);
});

module.exports = router;
