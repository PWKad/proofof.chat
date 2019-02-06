// const express = require('express');
// const router = express.Router();
// const channelsService = require('../services/channels');

// router.post('/', async (req, res, next) => {
//   const amount = req.body.amount;
//   const publicKey = req.body.publicKey;

//   const channelBody = {
//     amount,
//     publicKey
//   };

//   const result = await channelsService.create(channelBody);

//   return res.json(result);
// });

// router.get('/', async (req, res, next) => {
//   const result = await channelsService.getAll();

//   return res.json(result);
// });

// module.exports = router;
