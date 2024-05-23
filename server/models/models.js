const sequelize = require('../db')
const {DataTypes, ENUM} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketItem = sequelize.define('basket_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false}
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false}
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    address: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false},
    items: {type: DataTypes.JSONB, allowNull: false},
}) 

User.hasMany(Order)
Order.belongsTo(User)

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketItem)
BasketItem.belongsTo(Basket)

Type.hasMany(Item)
Item.belongsTo(Type)

Item.hasMany(Rating)
Rating.belongsTo(Item)

Item.hasMany(BasketItem)
BasketItem.belongsTo(Item)

module.exports = {
    User,
    Basket,
    BasketItem,
    Item,
    Type,
    Rating,
    Order
}