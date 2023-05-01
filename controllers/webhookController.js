// const {buffer} = require('micro');
// const getRawBody = require('raw-body');
// const orderController = require('./orderController')
const { order, product, stock } = require('../models');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

const createOrder = async (orderData) => {
    console.log('This is the order', orderData);

    const {id, amount_total, shipping_details, metadata} = orderData;
    const userId = metadata.userId;
    const products = JSON.parse(metadata.items);
    const price = amount_total / 100;
    const shippingAddress = JSON.stringify(shipping_details);
    const paymentInfo = id;

    try {
        const orderMetaData = await order.create({
            price,
            paymentInfo,
            shippingAddress,
            userId,
        });

        for (const itemId of products) {
            const productData = await product.findByPk(itemId);

            const stockData = await stock.findOne({
                where: {itemId: itemId}
            })

            // Update the stock
            if (stockData) {
                stockData.quantity = stockData.quantity - 1;
                await stockData.save();
            } else {
                await stock.create({
                    itemId,
                    quantity: 0,
                });
            }

            await productData.update({orderId: orderMetaData.orderId});
        }

        //Create and send invoice
        const invoice = await stripe.invoices.create({
            customer: id, // Replace customerId with the Stripe customer ID
            description: 'Invoice for order ' + orderMetaData.orderId, // Add a description for the invoice
            // amount_due: amount_total,
            currency: 'inr',
            metadata: {orderId: orderMetaData.orderId}, // Add metadata to associate the invoice with the order
            statement_descriptor: 'ShopKGP', // Replace with your business name
        });

        await stripe.invoices.sendInvoice(invoice.id); // Send the invoice to the customer

    } catch (err) {
        console.error(err);
        // res.status(500).json({
        //     message: 'Error creating order',
        // });
    }
}

const postOrder = async (req, res) => {
    const payload = req.body;
    const payloadString = JSON.stringify(payload, null, 2);

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret,
    });
    const event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);

    //Handle checkout session complete event
    if (event.type === 'checkout.session.completed') {
        // console.log(event.data.object.customer);
        await createOrder(event.data.object);
    }
    res.json({success: true});
}

module.exports = {
    postOrder
};