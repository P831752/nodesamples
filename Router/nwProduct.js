const express = require('express');
const router = express.Router();
const axios_instance = require('../middleware/axiosinstance')

router.route('/').get(async(req, res) => {
    try {
        const result = await axios_instance.get('/Products')
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(result.data.value))    
    } catch (error) {
        res.status(400)
    }
})
module.exports = router
