const { Type } = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
// const ApiError = require('../errors/ApiError')

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + '.jpg'
        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        const type = await Type.create({name, img: fileName})

        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()

        return res.json(types)
    }

    async update(req, res) {
        const {id} = req.params

        const type = await Type.findByPk(id)

        if(!type) {
            return res.status(404).json({ message: 'Категорія не знайдена' });
        }

        const oldFileName = path.join(__dirname, '..', 'static', type.img)

        if(fs.existsSync(oldFileName)) {
            fs.unlinkSync(oldFileName)
        }

        const {name} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + '.jpg'
        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        type.name = name
        type.img = fileName

        await type.save()

        return res.json(type)
    }

    async delete(req, res) {
        const {id} = req.params
        const type = await Type.findByPk(id)
        if(!type) {
            return res.status(404).json({ message: 'Категорія не знайдена' });
        }

        const fileName = path.join(__dirname, '..', 'static', type.img)

        if(fs.existsSync(fileName)) {
            fs.unlinkSync(fileName)
        }

        await type.destroy()

        return res.json(type)
    }
}

module.exports = new TypeController()