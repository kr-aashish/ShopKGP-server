const { product } = require('../models');
const getRandomUuid = require('../utils/generateUuid')

const getAllProducts = async () => {
    try {
        const allProducts = await product.findAll();
        return allProducts;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const createProduct = async (productData) => {
    try {
        let {itemId, sellerId, name, description, price, imageUrl, category} = productData;

        itemId = itemId.length ? itemId : getRandomUuid();
        sellerId = sellerId.length ? sellerId : getRandomUuid();

        const productMetaData = await product.create({
            itemId, 
            sellerId, 
            name, 
            description, 
            price, 
            imageUrl, 
            category,
        });
        return productMetaData;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {getAllProducts, createProduct};