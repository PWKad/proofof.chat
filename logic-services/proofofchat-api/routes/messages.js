const express = require('express');
const router = express.Router();
const messagesService = require('../services/messages');

router.get('/', async (req, res, next) => {
  const result = await messagesService.getAll();

  return res.json(result);
});

router.post('/', async (req, res, next) => {
  const message = req.body.message;
  const signature = req.body.signature;

  try {
    const result = await messagesService.create(message, signature);
    return res.json({ request: result.lightningRequest });
  } catch (error) {
    return res.status(401).send({message: 'Unable to validate signature / message.'});
  }
});

module.exports = router;
