const ApiError = require('../error/ApiError');
const {User, Deal} = require('../models/models')
const bcrypt = require('bcrypt')

class DealController {
    async create(req, res, next) {
        const {name, buyer, seller, sum, description} = req.body
        if (!name || !buyer || !seller || !sum || !description) {
            return next(ApiError.badRequest('Введите все данные'))
        }
        const checkBuyer = User.findOne({where: {email: buyer}})
        const checkSeller = User.findOne({where: {email: seller}})
        if (!checkBuyer || !checkSeller) {
            return next(ApiError.badRequest('Покупатель или продавец с таким email не существует'))
        }
        const deal = await Deal.create({name, buyer, seller, sum, status: 0, description})
        return res.json(deal)
    }

    async getAll(req, res) {
        const deals = await Deal.findAll()
        return res.json(deals)
    }

    async getOne(req, res, next) {
        const {email, password} = req.body
        if(!email || !password) {
            console.log('test', email, password)
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const dealBuyer = await Deal.findAll({where: {buyer: email}})
        const dealSeller = await Deal.findAll({where: {seller: email}})
        const deals = (dealBuyer && dealSeller) ? [...dealBuyer, ...dealSeller] : 
            dealBuyer ? dealBuyer : dealSeller
        if (!deals) {
            return next(ApiError.internal('Сделки не найдены'))
        }
        return res.json(deals)
    }

}

module.exports = new DealController()