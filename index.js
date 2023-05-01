const express = require('express');
const app = express();
const cors = require('cors');
const auth = require('./auth');
require("dotenv").config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); //for post request body as json..parse!
app.use(cors());//to whitelist the api request //change done
// const helmet = require('helmet');
// app.use(helmet());

const db = require('./models');

//Routers
const productRouter = require('./routes/productRoutes')
// app.use('/api/product', auth, productRouter);
app.use('/api/product', productRouter);

const checkoutRouter = require('./routes/checkoutRoutes');
app.use('/api/checkout', checkoutRouter);

const authRouter = require('./routes/authRoutes');
app.use('/api/auth', authRouter);

const orderRouter = require('./routes/orderRoutes');
app.use('/api/order', orderRouter);

app.use(bodyParser.raw({type: 'application/json'}));
const webhookRouter = require('./routes/webhookRoutes')
app.use('/api/webhook', webhookRouter);

app.use('*', (req, res) => {
    res.status(404).json({
        success: 'false',
        message: 'Invalid request',
        error: {
            statusCode: 404,
            message: "You reached a route that is not defined on this server",
        },
    });
});

const { API_PORT } = process.env;
const port = API_PORT || 3001;

//check if every single table exists in the database, if it don't, create it!
db.sequelize.sync().then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    })
});

//index2
// const http = require("http");
// const application = require("./app");
// const server = http.createServer(application);

// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });