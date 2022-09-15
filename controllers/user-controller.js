const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const Admin = require('../models/admin-model')
const Emp = require('../models/emp-model')

class UserController {

    static register = async (req, res) => {
        try {
            let [full_name, phone_number, email, 
                password, secret_key] = Object.values(req.body);
                if (!full_name || !phone_number || !email || !password || !secret_key) {
                    res.json({ status: 'failed', message: 'Please Fill-up All fields' })
                }
                if(secret_key != "adminKey001") throw new Error("Access Denied...");

            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);

            const newAdmin = await Admin.create({ full_name, phone_number, email, password })

            const jwt_token = jwt.sign({ userID: newAdmin._id }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN })
            res.status(200).json({ message: 'Registration Sucessfull', token: jwt_token })

        } catch (error) {
            if (error.code === 11000) 
                res.json({ status: 'failed', message: "Unique Field Violation", error })
            else 
                res.json({ status: 'failed', error })
        }
    }

    static login = async (req, res) => {
        var user;
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.json({ status: 'failed', message: 'Please Fill-up All fields' })
            }

            try {
                user = await Admin.findOne({ email }).select('+password');
                if (user == null) throw Error;
            } catch (error) {
                user = await Emp.findOne({ email }).select('+password');
            }
            
            const isPasswordMatch = await bcrypt.compare(password, user.password)

            if (isPasswordMatch) {
                const jwt_token = jwt.sign({ userID: user._id }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN })
                res.json({ status: 'sucess', message: 'Login Sucessfull', token: jwt_token })
            }
            else res.json({ status: 'failed', message: 'Invalid email or password' })

        } catch (error) {
            res.json({ status: 'failed', message: 'user not exists' })
        }
    }

    static logout = async (req, res) => {

    }
}

module.exports = UserController;