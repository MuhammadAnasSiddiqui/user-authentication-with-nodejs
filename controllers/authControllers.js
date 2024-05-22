const userModel = require("../models/userSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signupController = async (req, res) => {
    try {
        const { fullName, email, password, repPassword } = req.body

        if (!fullName || !email || !password || !repPassword) {
            return res.json({
                message: "requird fields are missing",
                status: false,
                data: null
            })

        }

        if (password !== repPassword) {
            return res.json({
                message: "possword doesn't matched",
                status: false,
                data: null
            })

        }

        const passwordHash = await bcrypt.hash(password, 10);
        const repeatPasswordHash = await bcrypt.hash(repPassword, 10);
        const objToSend = {
            full_name: fullName,
            email,
            password: passwordHash,
            rep_password: repeatPasswordHash
        }

        const emailExist = await userModel.findOne({ email });
        // console.log("emailExist", emailExist);

        if (emailExist) {
            return res.json({
                message: "email has already been taken",
                status: false,
                data: null
            })
        }

        const response = await userModel.create(objToSend);
        res.json({
            message: "user successfully signup",
            status: true,
            data: response
        })
        // console.log(response);


    } catch (error) {
        res.json({
            message: error.message,
            status: false,
            data: null
        })
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password, } = req.body

        if (!email || !password) {
            return res.json({
                message: "requird fields are missing",
                status: false,
                data: null
            })

        }

        const user = await userModel.findOne({ email });
        // console.log("user", user);

        if (!user) {
            return res.json({
                message: "invalid credential",
                status: false,
                data: null
            })
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            return res.json({
                message: "invalid credential",
                status: false,
                data: null
            })

        }

        const token = jwt.sign({ email: user.email }, process.env.jwtPrivateKey);
        console.log("Jwt token :", token)

        res.json({
            message: "user successfully login",
            status: true,
            data: user,
            token,
        })


    } catch (error) {
        console.log(error.message);
        res.json({
            message: error.message,
            status: false,
            data: null
        })
    }
}

module.exports = { signupController, loginController }