const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json()); //for post request body as json..parse!
app.use(cors());//to whitelist the api request

const db = require('./models');

//Routers
const productRouter = require('./routes/productRoutes')
app.use('/product', productRouter);

//check if every single table exists in the database, if it don't, create it!
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    })
});

const http = require("http");
const application = require("./app");
const server = http.createServer(application);

const { API_PORT } = process.env;
const port = API_PORT || 8000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
