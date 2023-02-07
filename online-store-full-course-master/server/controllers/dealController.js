const ApiError = require('../error/ApiError');
const {User, Deal} = require('../models/models')
const bcrypt = require('bcrypt')

class DealController {
    async create(req, res, next) {
        const {name, buyer, buyerNickname, seller, sellerNickname , sum, description} = req.body
        if (!name || !buyer || !seller || !sum || !description) {
            return next(ApiError.badRequest('Введите все данные'))
        }
        const checkBuyer = await User.findOne({where: {email: buyer}})
        const checkSeller = await User.findOne({where: {email: seller}})
        if (!checkBuyer || !checkSeller) {
            return next(ApiError.badRequest('Покупатель или продавец с таким email не существует'))
        }
        if (!buyerNickname && !sellerNickname) {
            return next(ApiError.badRequest('Введите имя пользователя'))
        }

        const checkBuyerNickname = buyerNickname || checkBuyer.nickname
        const checkSellerNickname = sellerNickname || checkSeller.nickname

        const deal = await Deal.create({
            name, 
            buyer, 
            seller, 
            sum, 
            status: 1, 
            description, 
            buyerNickname: checkBuyerNickname, 
            sellerNickname: checkSellerNickname})
        return res.json(deal)
    }

    async getAll(req, res) {
        const deals = await Deal.findAll()
        return res.json(deals)
    }

    async getUserDeal(req, res, next) {
        const {email, password} = req.body
        if(!email || !password) {
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

    async getOneDeal(req, res, next) {
        const {id} = req.body

        const deal = await Deal.findOne({where: {id}})
        if (!deal) {
            return next(ApiError.internal('Сделка не найдена'))
        }
        return res.json(deal)
    }

    async changeDeal (req, res, next) {
        const {id, name, sum, status, description, creatorEmail, creatorPassword} = req.body

        if (!id || !name || !sum || !status || !description || !creatorEmail || !creatorPassword) {
            return next(ApiError.badRequest('Введите все данные'))
        }
        const creator = await User.findOne({where: {email: creatorEmail}})
        if (!creator) {
            return next(ApiError.internal('Админ не найден'))
        }
        let comparePassword = bcrypt.compareSync(creatorPassword, creator.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        if(creator.role === 'USER'){
            return next(ApiError.badRequest('Нет доступа'))
        }
        const deal = await Deal.findOne({where: {id}})
        if (!deal) {
            return next(ApiError.internal('Сделка не найдена'))
        }
        const updatedDeal = await Deal.update({name, sum, status, description}, {where: {id}})

        return res.json(updatedDeal)
    }

    async deleteDeals(req, res, next) {
        const {id, creatorEmail, creatorPassword} = req.body
        const deal = await Deal.findOne({where: {id}})
        if (!deal) {
            return next(ApiError.internal('Сделка не найдена'))
        }
        const creator = await User.findOne({where: {email: creatorEmail}})
        if (!creator) {
            return next(ApiError.internal('Админ не найден'))
        }
        let comparePassword = bcrypt.compareSync(creatorPassword, creator.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        if(creator.role !== 'ADMIN'){
            return next(ApiError.badRequest('Нет доступа'))
        }
            await Deal.destroy({
                where: {id}
            })
           return res.json({...deal.dataValues})
    }

}

module.exports = new DealController()
