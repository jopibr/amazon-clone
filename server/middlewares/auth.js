const jwt = require('jsonwebtoken')

const auth = async (res, req, next) => {
    try {
        const token = req.header('x-auth-token')
        if (!token) {
            return res.status(401).json({msg: 'No auth token, access denied.'})
        }

        const verified = jwt.verify(token, 'passwordkey')
        if (!verified) {
            return res.status(401).json({msg: 'Token verification failed, authorization denied.'})
        }

        req.user = verified.id
        req.user = token
        next()
    } catch (e) {
        res.status(500).json({error: e.message})
    }
}

module.exports = auth
