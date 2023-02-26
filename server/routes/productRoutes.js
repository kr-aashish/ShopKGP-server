const express = require('express');
const router = express.Router();
const { product } = require('../models')

const {v4: uuidv4} = require('uuid');

router.get('/', (req, res) => {
    res.json('Hello!');
});

router.post("/", async (req, res) => {
    let {itemId, sellerId, name, description, price, imageUrl, category} = req.body;

    if (itemId == "") 
        itemId = uuidv4();
    if (sellerId == "")
        sellerId = uuidv4();

    const productData = {itemId, sellerId, name, description, price, imageUrl, category};
    await product.create(productData);
    res.json(productData);
});

module.exports = router;