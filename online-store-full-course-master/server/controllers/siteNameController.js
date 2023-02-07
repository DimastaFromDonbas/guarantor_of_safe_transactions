const ApiError = require('../error/ApiError');
const {User, SiteName} = require('../models/models')
const bcrypt = require('bcrypt')

class SiteNameController {
    async create(req, res, next) {
        const {name, email, password} = req.body
        if(!name || !email || !password) {
            return next(ApiError.internal('Введите все данные'))
        }
        const creator = await User.findOne({where: {email}})
        if (!creator) {
            return next(ApiError.internal('Админ не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, creator.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        if(creator.role !== 'ADMIN'){
            return next(ApiError.badRequest('Нет доступа'))
        }
           const siteName = await SiteName.create({siteName: name})
           return res.json(siteName)
    }

    async update(req, res, next) {
        const {name, email, password} = req.body
        if(!name || !email || !password) {
            return next(ApiError.internal('Введите все данные'))
        }
        const creator = await User.findOne({where: {email}})
        if (!creator) {
            return next(ApiError.internal('Админ не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, creator.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        if(creator.role !== 'ADMIN'){
            return next(ApiError.badRequest('Нет доступа'))
        }
           const siteName = await SiteName.update({siteName: name}, {where: {id: 1}})
           return res.json(siteName)
    }

    async getAllNames(req, res, next) {
        const names = await SiteName.findAll()
        return res.json({names})
    }

    async getName(req, res, next) {
        const name = await SiteName.findOne({where: {id: 1}})
        return res.json(name.siteName)
    }


}

module.exports = new SiteNameController()