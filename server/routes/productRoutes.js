const express = require('express');
const router = express.Router();
const { product } = require('../models')

router.get('/', (req, res) => {
    res.json('Hello!');
});

router.post("/", async (req, res) => {
    const productData = req.body;
    await product.create(productData);
    res.json(productData);
});

module.exports = router;