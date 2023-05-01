const {users, order, product, stock } = require('../models');
// const webhookController = require('./webhookController');

const getOrderById = async (req, res) => {
    try {
        const orderData = await order.findByPk(req.params.id);
        if (!orderData) {
            res.status(404).json({
                message: 'Order not found',
            });
            return;
        }
        res.status(200).json(orderData);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error in fetching order',
        });
    }
}

const getOrderByUserId = async (req, res) => {
    // console.log(req.params.id);
    try {
        const orderData = await order.findAll({
            where: {userId: req.params.id},
            include: [{
                model: product,
                as: 'products',
                include: [{
                    model: users,
                    as: 'seller'
                }]
            }]
        });
        res.status(200).json(orderData);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error in fetching orders',
        });
    }
}


const getAllOrders = async (req, res) => {
    try {
        const allOrders = await order.findAll();
        res.status(200).json(allOrders);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error in fetching orders',
        });
    }
}

// const createOrder = async (req, res) => {
//     try {
//         const {price, paymentInfo, shippingAddress, userId, products} = req.body;
//         let itemId = products[0].productId;
//         const productData = await product.findByPk(itemId);
//         if (!productData) {
//             res.status(404).json({
//                 message: 'Product not found',
//             });
//             return;
//         }
//
//         // const stockData = await stock.findByPk(productId);
//         const stockData = await stock.findOne({
//             where: {itemId: itemId}
//         })
//         if (stockData && stockData.quantity < 1) {
//             res.status(404).json({
//                 message: 'Out of stock',
//             });
//             return;
//         }
//
//         const orderMetaData = await order.create({
//             price,
//             paymentInfo,
//             shippingAddress,
//             userId,
//         });
//         if (stockData) {
//             stockData.quantity = stockData.quantity - 1;
//             await stockData.save();
//         } else {
//             await stock.create({
//                 productId,
//                 quantity: 0,
//             });
//         }
//
//         await productData.update({orderId: orderMetaData.orderId});
//
//         res.status(200).json(orderMetaData);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             message: 'Error creating order',
//         });
//     }
// }

const deleteOrder = async (req, res) => {
    try {
        const orderData = await order.findByPk(req.params.id);
        if (!orderData) {
            res.status(404).json({
                message: 'Order not found',
            });
            return;
        }
        const productData = await product.findByPk(orderData.productId);
        if (!productData) {
            res.status(404).json({
                message: 'Product not found',
            });
            return;
        }
        const stockData = await stock.findByPk(orderData.productId);
        if (stockData) {
            stockData.quantity = stockData.quantity + 1;
            await stockData.save();
        }
        await orderData.destroy();
        await productData.update({orderId: null});
        res.status(200).json({
            message: "Order deleted successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error in deleting order',
        });
    }
}

module.exports = {
    getOrderById,
    getAllOrders,
    getOrderByUserId,
    deleteOrder,
};