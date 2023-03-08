const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const auth = require('../auth');
const user = require('../models/user');

const userSignup = async(req, res) => {
    try {
        const {name, year, email, password, department} = req.body;

        const oldUser = await User.findOne({email});

        if (oldUser) {
            return res.status(409).send("User already exist. Please login");
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, 
            year, 
            department, 
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        const userToken = jwt.sign(
            {user_id: user._id, email}, 
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        );
        user.token = userToken;

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
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