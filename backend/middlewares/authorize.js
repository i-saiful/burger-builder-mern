const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    let token = req.header('authorization')
    if (!token) {
        return res.status(401).send('Access Denied. No token provided!')
    }

    try {
        const decoded = jwt.verify(
            token.split(' ')[1].trim(),
            process.env.JWT_SECRET_KEY
        )
        req.user = decoded
        next();
    } catch (error) {
        return res.status(400).send('Invalid token!')
    }
}