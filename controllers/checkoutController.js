require('dotenv').config();

// const stripe = require('stripe')('sk_test_51MuCNiSBkSkzOkBh9AXSdkcKz6N5PTHYmcowGfIFh1H9zOcCa1kZJi3rm6OIe3DYoVeSPq8MCrvje6t4fOkyCVJN00aqC2lz04');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const checkoutProduct = async (req, res) => {
    // console.log("This is the request", req.body);
    const {userMetadata, stripeItems, basket} = req.body;
    const itemIdArray = basket.map(item => item.id);
    // console.log(itemIdArray);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: stripeItems,
        mode: "payment",
        success_url: `${process.env.REACT_APP_HOST_URL}/success`,
        cancel_url: `${process.env.REACT_APP_HOST_URL}/error`,
        metadata: {
            userId: userMetadata.userId,
            // images: JSON.stringify(basket.map(item => item.imageUrl)),
            items: JSON.stringify(itemIdArray),
        },
        shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'IN'],
        }
    });

    // console.log(session);
    const sessionId = session.id;

    res.status(200)
        .json({id: sessionId});
}

module.exports = { checkoutProduct };