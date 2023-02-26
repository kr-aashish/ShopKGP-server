const express = require('express');
const router = express.Router();
const { product } = require('../models')
const getRandomUuid = require('../utils/generateUuid')

router.get('/', async (req, res) => {
    const allProducts = await product.findAll();
    res.json(allProducts);
});

router.post("/", async (req, res) => {
    let {itemId, sellerId, name, description, price, imageUrl, category} = req.body;

    itemId = itemId.length ? itemId : getRandomUuid();
    sellerId = sellerId.length ? sellerId : getRandomUuid();

    const productData = {itemId, sellerId, name, description, price, imageUrl, category};
    await product.create(productData);
    res.json(productData);
});

module.exports = router;