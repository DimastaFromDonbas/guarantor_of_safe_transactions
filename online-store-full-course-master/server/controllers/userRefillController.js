const ApiError = require('../error/ApiError');
const {User, Deal, UserRefill} = require('../models/models')
const bcrypt = require('bcrypt')

class UserRefillController {
    async create(req, res, next) {
        const {id, time, score, status, userEmail, creatorEmail, creatorPassword} = req.body
        if (!id || !time || !score || !status || !userEmail || !creatorEmail) {
            return next(ApiError.badRequest('Введите все данные'))
        }
        const creator = await User.findOne({where: {email: creatorEmail}})
        if (!creator) {
            return next(ApiError.badRequest('Админ с таким email не найден'))
        }
        let comparePassword = bcrypt.compareSync(creatorPassword, creator.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        if(creator.role !== 'ADMIN'){
            return next(ApiError.badRequest('Нет доступа'))
        }
        const checkUser = await User.findOne({where: {email: userEmail}})
        if (!checkUser) {
            return next(ApiError.badRequest('Пользователь с таким email не найден'))
        }
        const userRefill = await UserRefill.create({id, time, score, status, userEmail})
        const userUpdate = await User.update({score: checkUser.score + score}, {where: {email: userEmail}})

        return res.json(userRefill)
    }

    async changeRefill(req, res, next) {
        const {id, time, score, status, userEmail, creatorEmail, creatorPassword} = req.body
        if (!id || !time || !score || !status || !userEmail || !creatorEmail) {
            return next(ApiError.badRequest('Введите все данные'))
        }
        const creator = User.findOne({where: {email: creatorEmail}})
        if (!creator) {
            return next(ApiError.badRequest('Админ с таким email не найден'))
        }
        let comparePassword = bcrypt.compareSync(creatorPassword, creator.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        if(creator.role !== 'ADMIN'){
            return next(ApiError.badRequest('Нет доступа'))
        }
        const chechUser = await User.findOne({where: {email: userEmail}})
        if (!chechUser) {
            return next(ApiError.badRequest('Пользователь с таким email не найден'))
        }

          const refill = await UserRefill.update({id, time, score, status}, {where: {userEmail}})
           return res.json({...refill.dataValues, id, time, score, status})
    }

    async getAll(req, res) {
        const refills = await UserRefill.findAll()
        return res.json(refills)
    }

    async getUserRefill(req, res, next) {
        const {email} = req.body
        if(!email) {
            return next(ApiError.badRequest('Некорректный email'))
        }
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        const userRefills = await UserRefill.findAll({where: {userEmail: email}})
        if (!userRefills) {
            return next(ApiError.internal('Пополнения не найдены'))
        }
        return res.json(userRefills)
    }

    async getOneRefill(req, res, next) {
        const {id} = req.body

        const refill = await UserRefill.findOne({where: {id}})
        if (!refill) {
            return next(ApiError.internal('Пополнение не найдено'))
        }
        return res.json(refill)
    }

}

module.exports = new UserRefillController()