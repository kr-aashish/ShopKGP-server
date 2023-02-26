const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', async (req, res) => {
    try {
        const allProducts = await productController.getAllProducts();
        res.status(200).json(allProducts);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'unable to fetch all products',
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const productData = req.body;
        const productMetaData = await productController.createProduct(productData);
        res.status(200).json(productMetaData);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error creating product',
        });
    }
});

module.exports = router;