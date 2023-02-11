const ApiError = require('../error/ApiError');
const {User, AdminChat} = require('../models/models')

class AdminChatController {
    async create(req, res, next) {
        const {nickname, email} = req.body
        if (!nickname || !email) {
            return next(ApiError.badRequest('Введите все данные'))
        }
        const user = await User.findOne({where: {email: email}})
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }

        const checkAdminChat = await AdminChat.findOne({where: {email}})
        if(checkAdminChat) {
            return next(ApiError.badRequest('Чат уже существует'))
        }

        const adminChat = await AdminChat.create({nickname, email, statusForUser: 1, newMessage: 1})
        return res.json(adminChat)
    }

    async getAdminChats(req, res, next) {
        const {adminEmail, adminPassword} = req.body
        if (!adminEmail || !adminPassword) {
            return next(ApiError.badRequest('Введите все данные'))
        }
        const admin = await User.findOne({where: {email: adminEmail}})
        if (!admin) {
            return next(ApiError.internal('Админ не найден'))
        }
        let comparePassword = bcrypt.compareSync(adminPassword, admin.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        if(admin.role === 'USER'){
            return next(ApiError.badRequest('Нет доступа'))
        }
        const adminChats = await AdminChat.findAll()
        if (!adminChats) {
            return next(ApiError.internal('Чаты не найдены'))
        }
        return res.json(adminChats)
    }


}

module.exports = new AdminChatController()