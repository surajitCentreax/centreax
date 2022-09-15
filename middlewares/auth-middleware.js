const jwt = require('jsonwebtoken');
const Admin = require('../models/admin-model')

const isAuthorized = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if(!token) { throw Error }
        const AdminID = await jwt.verify(token, process.env.SECRET_KEY).userID;
        
        const admin = await Admin.findById(AdminID)
        next()
    } catch (error) {
        res.status(401).json({ status: 'failed', message: 'Login Require' })
    }
}

module.exports = isAuthorized;