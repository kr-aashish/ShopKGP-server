const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const getRandomUuid = require('../utils/generateUuid')

// const { sequelize, DataTypes } = require('sequelize');
// const User = require('../models/userSchema')(sequelize, DataTypes);
const users = require('../models');

// const auth = require('../auth');
// const user = require('../models/user');

const userSignup = async(req, res) => {
    try {
        console.log("This is the request", req.body);
        // const {name, email, contactNumber, year, department, password} = req.body;
        const {name} = req.body;
        console.log(name);
        // const oldUser = await User.findOne({email});

        // if (oldUser) {
        //     return res.status(409).send("User already exist. Please login");
        // }

        // email = email.toLowerCase();
        // const userId = getRandomUuid();
        // const encryptedPassword = await bcrypt.hash(password, 10);

        // console.log("This is the user", User);

        const userMetaData = await users.create({
            // userId, 
            // encryptedPassword, 
            name, 
            // email,
            // contactNumber,
            // year, 
            // department
        });

        // const userToken = jwt.sign(
        //     {user_id: user._id, email}, 
        //     process.env.TOKEN_KEY,
        //     { expiresIn: "2h" }
        // );
        // user.token = userToken;

        res.status(200).json("Sucess");
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error creating product',
        });
    }
}

const userLogin = async(req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            res.status(400).send("All input is required");
            return;
        }

        const user = await User.findOne()
    } catch(error) {
        
    }
}

module.exports = {
    userSignup,
    userLogin
}