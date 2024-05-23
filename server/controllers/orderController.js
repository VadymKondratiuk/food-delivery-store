const { Order } = require('../models/models')
const ApiError = require('../errors/ApiError')
const { Op } = require('sequelize');

class OrderController {
    async create(req, res, next) {
        try {
            let {address, status, items, userId} = req.body

            const order = await Order.create({address, status, items, userId})

            return res.json(order)
        }
        catch(err) {
            next(ApiError.badRequest(err.message))

        }
    }   

    async getAll(req, res) {
        const orders = await Order.findAll()

        if(!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Замовлення не знайдені' });
        }

        return res.json(orders)
    }

    async getAllActive(req, res) {
        try {
            const orders = await Order.findAll({where: {status: {[Op.ne]: "ЗАВЕРШЕНЕ"}}})
    
            // if(!orders || orders.length === 0) {
            //     return res.status(404).json({ message: 'Замовлення не знайдені' });
            // }
    
            return res.json(orders)
        }
        catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params
            const {status, address, items, userId} = req.body
            const order = await Order.findByPk(id)
    
            if(!order) {
                return res.status(404).json({ message: 'Замовлення не знайдене' });
            }
    
            order.status = status
            order.address = address
            order.items = items 
            order.userId = userId 
    
            await order.save()
    
            return res.json(order)
        }
        catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async updateStatus(req, res) {
        try {
            const {id} = req.params
            const {status} = req.body
            const order = await Order.findByPk(id)
    
            if(!order) {
                return res.status(404).json({ message: 'Замовлення не знайдене' });
            }
    
            order.status = status
    
            await order.save()
    
            return res.json(order)
        }
        catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params
            const order = await Order.findByPk(id)
            if(!order) {
                return res.status(404).json({ message: 'Замовлення не знайдене' });
            }
    
            await order.destroy()
    
            return res.json(order)
        }
        catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

module.exports = new OrderController()