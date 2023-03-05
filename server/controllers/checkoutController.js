const stripe = require('stripe')('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');
const getRandomUuid = require('../utils/generateUuid')

const checkoutProduct = async (req, res) => {
    console.log("This is the request", req.body);

    let error, status;
    
    try {
        const {product, token} = req.body;

        const customer = await stripe.customers.create({
            email: token.email, 
            source: token.id,
        }) 

        const key = getRandomUuid();

        const charge = await stripe.charges.create({
            amount: product.price, 
            currency: "usd", 
            customer: customer.id, 
            receipt
        })
    } catch (error) {
        console.log(error);
        res.send(500).json({"message": "Internal server error"});
    }


    res.status(200).json({"data": "Sample response"});  
}

module.exports = {checkoutProduct}