const { stock, product } = require('../models');

const getStockByItemId = async (req, res) => {
    try {
        const stockData = await stock.findOne({ where: { itemId: req.params.id } });
        if (!stockData) {
            res.status(404).json({
                message: 'Stock not found for given itemId',
            });
            return;
        }
        res.status(200).json(stockData);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error in fetching stock',
        });
    }
};

const createStock = async (req, res) => {
    try {
        const { itemId, totalQuantity } = req.body;
        const productData = await product.findByPk(itemId);
        if (!productData) {
            res.status(400).json({
                message: 'Product not found',
            });
            return;
        }
        const stockData = await stock.create({ itemId, totalQuantity });
        res.status(200).json(stockData);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error creating stock',
        });
    }
};

const updateStock = async (req, res) => {
    try {
        const { totalQuantity } = req.body;
        const stockData = await stock.findOne({ where: { itemId: req.params.id } });
        if (!stockData) {
            res.status(404).json({
                message: 'Stock not found for given itemId',
            });
            return;
        }
        stockData.totalQuantity = totalQuantity;
        await stockData.save();
        res.status(200).json(stockData);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error updating stock',
        });
    }
};

const deleteStock = async (req, res) => {
    try {
        const stockData = await stock.findOne({ where: { itemId: req.params.id } });
        if (!stockData) {
            res.status(404).json({
                message: 'Stock not found for given itemId',
            });
            return;
        }
        await stockData.destroy();
        res.status(200).json({
            message: 'Stock deleted successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error in deleting stock',
        });
    }
};

module.exports = {
    getStockByItemId,
    createStock,
    updateStock,
    deleteStock,
};
