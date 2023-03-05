const stripe = require('stripe')('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');
const getRandomUuid = require('../utils/generateUuid')

const checkoutProduct = (req, res) => {
    console.log("This is the request", req.body);
    res.status(200).json({"data": "Sample response"});
}

module.exports = {checkoutProduct}