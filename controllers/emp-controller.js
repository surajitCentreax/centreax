const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const Emp = require('../models/emp-model')

class EmpController {

    static create = async (req, res) => {
        try {
            let [full_name, address, 
                phone_number, email, 
                user_name, password, 
                blood_group, designation] = Object.values(req.body);

            if (!full_name || !address || !phone_number || !email || !user_name || !password || !blood_group || !designation) {
                res.json({ status: 'failed', message: 'Please Fill-up All fields' })
            }
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);

            const newEmp = await Emp.create({ full_name, address, phone_number, email, user_name, password, blood_group, designation })

            // const jwt_token = jwt.sign({ userID: newEmp._id }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN })
            // res.json({ status: 'sucess', message: 'Registration Sucessfull', token: jwt_token })
            res.json({ status: 'sucess', message: 'Registration Sucessfull' })

        } catch (error) {
            if (error.code === 11000) 
                res.json({ status: 'failed', message: "Unique Field Violation", error })
            else 
                res.json({ status: 'failed', error })
        }
    }

    static read = async (req, res) => {
        try {
            const allEmp = await Emp.find()
            res.json({ status: 'sucess', data: allEmp })

        } catch (error) {
            res.json({ status: 'failed', error })
        }
    }

    static login = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.json({ status: 'failed', message: 'Please Fill-up All fields' })
            }
            const user = await User.findOne({ email })
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

    static reset_password = async (req, res) => {
        try {
            const { email, old_password, new_password } = req.body;
            if (!email || !old_password || !new_password) {
                res.json({ status: 'failed', message: 'Please Fill-up All fields' })
            }
            const user = await User.findOne({ email })
            const isPasswordMatch = await bcrypt.compare(old_password, user.password);

            if (isPasswordMatch) {
                const hashPassword = await bcrypt.hash(new_password, 10)
                await User.findByIdAndUpdate(user._id, { password: hashPassword })
                res.json({ status: 'sucess', message: 'Password Changed Sucessfully' })
            }
            else res.json({ status: 'failed', message: 'Invalid email or password' })

        } catch (error) {
            res.json({ status: 'failed', message: 'user not exists' })
        }
    }

    static forgot_password = async (req, res) => {

    }
}

module.exports = EmpController;