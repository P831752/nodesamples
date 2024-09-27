const express = require('express');
const router = express.Router();
const localJSON = require('../data/products.json')

router.route('/').get((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(JSON.stringify(localJSON))
})
module.exports = router;
