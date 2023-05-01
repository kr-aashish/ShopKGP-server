const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getRandomUuid = require('../utils/generateUuid')

const {users} = require('../models');

// const auth = require('../auth'); -> middleware authorisation check
//e.g. // app.use("/api/product", auth, productRoute); //verify token before going to productController

const userSignup = async(req, res) => {
    try {
        // console.log("This is the request", req.body);
        let {name, email, contactNumber, year, department, password} = req.body;
        const oldUser = await users.findOne({where: {email}});

        if (oldUser) {
            return res.status(409).send("User already exist. Please login");
        }

        email = email.toLowerCase();
        const userId = getRandomUuid();
        encryptedPassword = await bcrypt.hash(password, 10);

        const userMetaData = await users.create({
            userId, 
            password: encryptedPassword, 
            name, 
            email,
            contactNumber,
            year, 
        });

        const token = jwt.sign (
            {userId: userId, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        userMetaData.token = token;

        res.status(200).json(userMetaData);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error creating user',
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

        const user = await users.findOne({where : {email}});

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {userId: user.userId, email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            )
            res.status(200).json({
                ...user.toJSON(),
                token,
            });
        }
        else {
            res.status(400).send("Invalid credentials");
        }

    } catch(error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server error",
        });
    }
}

const socialLogin = async(req, res) => {
    try {
        const {email} = req.body;

        const user = await users.findOne({where : {email}});

        if (user) {
            const token = jwt.sign(
                {userId: user.userId, email},
                process.env.TOKEN_KEY,
                {expiresIn: '2h'}
            );
            res.status(200).json(user);
        }
        else {
            res.status(400).send("Invalid credentials");
        }

    } catch(error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server error",
        });
    }
}

const welcomeMessage = (req, res) => {
    res.status(200).send("Welcome 🙌");
}

const handleAnyOtherCase = (req, res) => {
    res.status(404).send({
        status: "false", 
        message: "Invalid request",
        error: "The endpoint does not exist for this api",
    });
}

module.exports = {
    userSignup,
    userLogin, 
    handleAnyOtherCase,
    socialLogin,
    welcomeMessage
}