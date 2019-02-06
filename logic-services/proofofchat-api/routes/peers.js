// const express = require('express');
// const router = express.Router();
// const peersService = require('../services/peers');

// router.post('/', async (req, res, next) => {
//   const socket = `${req.body.host}:${req.body.port}`;
//   const publicKey = req.body.publicKey;

//   const peerBody = {
//     socket,
//     publicKey
//   };

//   const result = await peersService.create(peerBody);
//   return res.json(result);
// });

// router.get('/', async (req, res, next) => {
//   const result = await peersService.getAll();
//   return res.json(result);
// });

// module.exports = router;
