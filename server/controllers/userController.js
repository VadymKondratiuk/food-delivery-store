require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')
const ApiError = require('../errors/ApiError')

const generateJWT = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, role} = req.body
            
            if(!email || !password) {
                return next(ApiError.badRequest('Неправильно вказаний пароль або пошта'))
            }
    
            const candidate = await User.findOne({where: {email}})
            if(candidate) {
                return next(ApiError.badRequest('Такий користувач вже зареєстрований'))
            }
    
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, role, password: hashPassword})
            const basket = await Basket.create({userId: user.id})
            const token = generateJWT(user.id, user.email, user.role)
    
            return res.json({token})
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})
            
            if(!user) {
                return next(ApiError.badRequest('Користувача не знайдено'))
            }
    
            let comparePassword = bcrypt.compareSync(password, user.password)
    
            if(!comparePassword){
                return next(ApiError.badRequest('Неправильно введений пароль'))
            }
    
            const token = generateJWT(user.id, user.email, user.role)
    
            return res.json({token})
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }

    async check(req, res) {
        try {
            const token = generateJWT(req.user.id, req.user.email, req.user.role)
            return res.json({token})
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }
}

module.exports = new UserController()
