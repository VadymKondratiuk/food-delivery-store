const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const { Item, ItemInfo } = require('../models/models')
const ApiError = require('../errors/ApiError')

class ItemController {
    async create(req, res, next) {
        try {
            let {name, price, typeId, description} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const item = await Item.create({name, price, typeId, img: fileName, description})

            return res.json(item)
        } 
        catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getAll(req, res, next) {
        try {
            let {typeId, limit, page } = req.query
    
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit
            let items;
    
            if(!typeId) {
                items = await Item.findAndCountAll({limit, offset})
            }
            if(typeId) {
                items = await Item.findAndCountAll({where: {typeId}, limit, offset})
            }
    
            return res.json(items)
        }
        catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const item = await Item.findOne(
                {
                    where: {id},
                }
            )
            return res.json(item)
        }
        catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
    
            const item = await Item.findByPk(id)
    
            if(!item) {
                return res.status(404).json({ message: 'Позиція не знайдена' });
            }
    
            const oldFileName = path.join(__dirname, '..', 'static', item.img)
    
            if(fs.existsSync(oldFileName)) {
                fs.unlinkSync(oldFileName)
            }
    
            const {name, price, rating, typeId, description} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
    
            item.name = name
            item.rating = rating
            item.description = name
            item.price = price
            item.typeId = typeId
            item.img = fileName
    
            await item.save()
    
            return res.json(item)
        }
        catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const item = await Item.findByPk(id)
            if(!item) {
                return res.status(404).json({ message: 'Позиція не знайдена' });
            }
    
            const fileName = path.join(__dirname, '..', 'static', item.img)
    
            if(fs.existsSync(fileName)) {
                fs.unlinkSync(fileName)
            }
    
            await item.destroy()
    
            return res.json(item)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

module.exports = new ItemController()