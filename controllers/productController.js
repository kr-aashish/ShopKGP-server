'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
let sequelize;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}


const { product, stock } = require('../models');
const getRandomUuid = require('../utils/generateUuid');
const { Op } = require('sequelize');


const getProductbyId = async (req, res) => {
    try {
        const productData = await product.findByPk(req.params.itemId);
        if (!productData) {
            res.status(404).json({
                message: 'Product not found',
            });
            return;
        }
        const stockData = await stock.findOne({ where: { itemId: req.params.itemId } });
        const productWithStock = {
            ...productData.toJSON(),
            stock: stockData ? stockData.stock : 0
        }
        res.status(200).json(productWithStock);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error in fetching product',
        });
    }
}

// const getAllProducts = async (req, res) => {
//     try {
//         const products = await product.findAll({
//             include: [{
//                     model: stock,
//                     where: {quantity: 1}
//                     // attributes: ['quantity'],
//                     // where: {quantity: {[Op.gt]: 0}}
//                 }]
//         });
//         res.status(200).json(products);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             message: 'Error in fetching products',
//         });
//     }
// }

const getAllProducts = async (req, res) => {
    try {
        const products = await product.findAll({
            include: [{
                model: stock,
                attributes: ['quantity']
            }],
            where: {
                '$stock.quantity$': {
                    [Sequelize.Op.gt]: 0
                }
            }
        });
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error in fetching products',
        });
    }
}

// const createProduct = async (req, res) => {
//     try {
//         console.log("This is the request", req.body);
//         let {itemId, sellerId, name, description, price, imageUrl, category} = req.body;
//
//         // itemId = itemId.length ? itemId : getRandomUuid();
//         // sellerId = sellerId.length ? sellerId : getRandomUuid();
//         itemId = itemId && itemId.length ? itemId : getRandomUuid();
//         // sellerId = sellerId && sellerId.length ? sellerId : getRandomUuid();
//         // sellerId = "55fe241d-a58a-464d-b5bb-f77e4b55ab4e";
//
//         const productMetaData = await product.create({
//             itemId,
//             name,
//             description,
//             price,
//             imageUrl,
//             category,
//             sellerId
//         });
//         res.status(200).json(productMetaData);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: 'Error creating product',
//         });
//     }
// }

const createProduct = async (req, res) => {
    // console.log("This is the request", req.body);
    let transaction;
    try {
        let { itemId, sellerId, name, description, price, imageUrl, category } = req.body;

        itemId = itemId && itemId.length ? itemId : getRandomUuid();

        // transaction = await sequelize.transaction();
        // const productMetaData = await product.create({
        //     itemId,
        //     sellerId: 'e268c744-b009-46c5-b5ff-1ebd391886b6',
        //     name: 'Hi',
        //     description: 'Hey there, this is a sample product',
        //     price: 290,
        //     imageUrl: 'https://shopkgp.blob.core.windows.net/shopkgp-media/1681198139203',
        //     category: 'electronics'
        // });
        // , { transaction });
        //
        const productMetaData = await product.create({
            itemId,
            sellerId,
            name,
            description,
            price: parseInt(price),
            imageUrl,
            category
        });
        await stock.create({
            itemId,
            quantity: 1
        });
        // { transaction });

        // await transaction.commit();
        res.status(200)
            // .json("Successful")
            .json(productMetaData);
    } catch (err) {
        console.log(err);
        // if (transaction) await transaction.rollback();
        res.status(500).send(err);
    }
}

const updateProduct = async (req, res) => {
    try {
        const { itemId, sellerId, name, description, price, imageUrl, category, orderId } = req.body;

        if (!itemId || !sellerId || !name || !description || !price || !category) {
            return res.status(400).json({
                message: 'All fields are required',
            });
        }

        const productData = await product.findByPk(req.params.id);
        if (!productData) {
            res.status(404).json({
                message: 'Product not found',
            });
            return;
        }

        productData.itemId = itemId;
        productData.sellerId = sellerId;
        productData.name = name;
        productData.description = description;
        productData.price = price;
        productData.imageUrl = imageUrl;
        productData.category = category;
        productData.orderId = orderId;
        await productData.save();

        const stockData = await stock.findOne({ where: { itemId: req.params.id } });
        const updatedProductWithStock = {
            ...productData.toJSON(),
            stock: stockData ? stockData.stock : 0
        }
        res.json(updatedProductWithStock);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error updating product',
        });
    }
}

const deleteProduct = async (req, res) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();

        const productData = await product.findByPk(req.params.id);
        if (!productData) {
            res.status(404).json({
                message: 'Product not found',
            });
            return;
        }

        await product.destroy({ where: { id: req.params.id } }, { transaction });
        await stock.destroy({ where: { itemId: req.params.id } }, { transaction });

        await transaction.commit();
        res.status(200).json({
            message: 'Product deleted successfully',
        });
    } catch (err) {
        console.error(err);
        if (transaction) await transaction.rollback();
        res.status(500).json({
            message: 'Error deleting product',
        });
    }
}


// const { product } = require('../models');
// const getRandomUuid = require('../utils/generateUuid')
//
// const getProductbyId = async (req, res) => {
//     try {
//         const productData = await product.findByPk(req.params.id);
//         if (!productData) {
//             res.status(404).json({
//                 message: 'Product not found',
//             });
//             return;
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             message: 'Error in fetching product',
//         });
//     }
// }
//
// const getAllProducts = async (req, res) => {
//     try {
//         const allProducts = await product.findAll();
//         res.status(200).json(allProducts);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             message: 'Error in fetching products',
//         });
//     }
// }
//
//
// const updateProduct = async (req, res) => {
//     try {
//         const {itemId, sellerId, name, description, price, imageUrl, category} = req.body;
//
//         if (!itemId || !sellerId || !name || !description || !price || !category) {
//             return res.status(400).json({
//                 message: 'All fields are required',
//             });
//         }
//
//         const productData = await product.findByPk(req.params.id);
//         if (!productData) {
//             res.status(404).json({
//                 message: 'Product not found',
//             });
//             return;
//         }
//
//         productData.itemId = itemId;
//         productData.sellerId = sellerId;
//         productData.name = name;
//         productData.description = description;
//         productData.price = price;
//         productData.imageUrl = imageUrl;
//         productData.category = category;
//         await productData.save();
//
//         res.json(productData);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             message: 'Error updating product',
//         });
//     }
// }
//
// const deleteProduct = async (req, res) => {
//     try {
//         const productData = await product.findByPk(req.params.id);
//         if (!productData) {
//             res.status(404).json({
//                 message: 'Product not found',
//             });
//             return;
//         }
//         await productData.destroy();
//         res.status(200).json({
//             message: "Product deleted successfully"
//         })
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             message: 'Error in deleting product',
//         });
//     }
// }
//
module.exports = {
    getProductbyId,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
};