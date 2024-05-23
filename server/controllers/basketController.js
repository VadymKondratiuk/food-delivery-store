const { BasketItem } = require('../models/models')
const ApiError = require('../errors/ApiError')

class BasketController {
    async create(req, res, next) {
        try {
            let {basketId, itemId} = req.body
            const basket_item = await BasketItem.create({basketId, itemId})
            return res.json(basket_item)
        } 
        catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getForUser(req, res) {
        try {
            const {basketId} = req.params
            const basket_item = await BasketItem.findAll(
                {
                    where: {basketId}
                }
            )
            if(!basket_item) {
                return res.status(404).json({ message: 'Basket_Item з для користувача з таким ID не знайдено' });
            }

            return res.json(basket_item)
        } 
        catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params
            const basket_item = await BasketItem.findByPk(id)
    
            if(!basket_item) {
                return res.status(404).json({ message: 'Basket_Item з таким ID не знайдено' });
            }
            await basket_item.destroy()
    
            return res.json(basket_item)
        } 
        catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async deleteForUser(req, res) {
        try {
            const {basketId} = req.params
            const basket_items = await BasketItem.findAll(
                {
                    where: {basketId}
                }
            )
            console.log(basket_items)
    
            if(!basket_items || basket_items.length === 0) {
                return res.status(404).json({ message: 'Basket_Item з для користувача з таким ID не знайдено' });
            }

            await Promise.all(basket_items.map(item => item.destroy()));
    
            return res.json(basket_items)
        } 
        catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

}

module.exports = new BasketController()