const ApiError = require('../error/ApiError');
const { User, MessageToAdmin, AdminChat } = require('../models/models')
const bcrypt = require('bcrypt')
const fs = require('fs')

class MessageToAdminController {
    async create(req, res, next) {
        const { nickname, email, time, message, image } = req.body
        if (!nickname || !email || !time || !message) {
            return next(ApiError.badRequest('Введите все данные'))
        }
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        let adminChat = await AdminChat.findOne({ where: { email } })
        if (!adminChat) {
            adminChat = await AdminChat.create({ nickname, email, statusForUser: 1, newMessage: 1 })
        }
        if (!adminChat) {
            return next(ApiError.badRequest('Ошибка создания чата'))
        }
        await AdminChat.update({ statusForUser: 1, newMessage: 1 }, { where: { id: adminChat.id } })
        const messageToAdmin = await MessageToAdmin.create({ nickname, email, role: 'USER', administratorName: '', message, time, statusForUser: 1, chatId: adminChat.id })
        if (!messageToAdmin) {
            return next(ApiError.badRequest('Ошибка отправки сообщение'))
        }
        if (image) {
            const result = await MessageToAdmin.update({ image }, { where: { id: messageToAdmin.id } })
            return { ...messageToAdmin.dataValues, image }
        }
        return messageToAdmin
    }

    async createForAdmin(req, res, next) {
        const { administratorName, time, message, id, adminEmail, adminPassword } = req.body
        if (!administratorName || !time || !message || !id || !adminEmail || !adminPassword) {
            return next(ApiError.badRequest('Введите все данные'))
        }

        const admin = await User.findOne({ where: { email: adminEmail } })
        if (!admin) {
            return next(ApiError.internal('Админ не найден'))
        }
        let comparePassword = bcrypt.compareSync(adminPassword, admin.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        if (admin.role === 'USER') {
            return next(ApiError.badRequest('Нет доступа'))
        }
        let adminChat = await AdminChat.findOne({ where: { id } })
        if (!adminChat) {
            return next(ApiError.badRequest('Чат не найден'))
        }
        await AdminChat.update({ statusForUser: 1, newMessage: 2 }, { where: { id: adminChat.id } })
        const messageToAdmin = await MessageToAdmin.create({ nickname: '', email: adminChat.email, role: 'ADMIN', administratorName, message, time, statusForUser: 1, chatId: adminChat.id })
        return messageToAdmin
    }

    async getMessagesToAdmin(req, res, next) {
        const { email } = req.body
        if (!email) {
            return next(ApiError.badRequest('Введите все данные'))
        }
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        let adminChat = await AdminChat.findOne({ where: { email } })
        if (!adminChat) {
            return next(ApiError.badRequest('Чат не найден'))
        }
        const messages = await MessageToAdmin.findAll({ where: { chatId: adminChat.id } })
        if (!messages) {
            return next(ApiError.internal('Сообщения не найдены'))
        }
        console.log('messages', messages)
        return res.json(messages)
    }


}

module.exports = new MessageToAdminController()