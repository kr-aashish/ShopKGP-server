const express = require('express');
const app = express();

const db = require('./models');

//check if every single table exists in the database, if it don't, create it!
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    })
});