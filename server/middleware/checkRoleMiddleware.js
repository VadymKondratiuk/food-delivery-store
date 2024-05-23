const jwt = require('jsonwebtoken')

module.exports = (role) => {
    return (req, res, next) => {
        if(req.method === "OPTIONS"){
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token) {
                return res.status(401).json({message: "Користувач не авторизований"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                return res.status(403).json({message: "Відхилено в доступі"})
            }
            req.user = decoded
            next()
        } 
        catch(err) {
            res.status(401).json({message: "Користувач не авторизований"})
        }
    }
}

