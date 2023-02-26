const express = require('express');
const app = express();

app.use(express.json()); //for post request body as json..parse!

const db = require('./models');
const { post } = require('./routes/productRoutes');

//Routers
const productRouter = require('./routes/productRoutes')
app.use('/product', productRouter);

//check if every single table exists in the database, if it don't, create it!
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    })
});