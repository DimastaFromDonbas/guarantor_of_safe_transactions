const ApiError = require('../error/ApiError');
const {User, MessageToAdmin} = require('../models/models')

class MessageToAdminController {
    async create(req, res, next) {
        const {addreserNickname, addreserEmail, role, adminEmail, adminNickname, receiverEmail, receiverNickname, message, time} = req.body
        if (!message || !time || !role) {
            return 'Нет всех данных'
        }
        const user = await User.findOne({where: {email: addreserEmail || adminEmail}})
        if (!user) {
            return 'Пользователь не найден'
        }

        const messageToAdmin = await MessageToAdmin.create({addreserNickname, addreserEmail, role , adminEmail, adminNickname, receiverEmail, receiverNickname, message, time})
        return messageToAdmin
    }

    async getMessagesToAdmin(req, res, next) {
        const {email} = req.body
        if(!email) {
            return next(ApiError.badRequest('Введите все данные'))
        }
        const user = await User.findOne({where: {email}})
        if (!user) {
            return 'Пользователь не найден'
        }
        const addreserMessages = await MessageToAdmin.findAll({where: {addreserEmail: email}})
        const receiverMessages = await MessageToAdmin.findAll({where: {receiverEmail: email}}) 
        if (!addreserMessages && !receiverMessages) {
            return next(ApiError.internal('Сообщения не найдены'))
        }
        return res.json([...addreserMessages, ...receiverMessages])
    }


}

module.exports = new MessageToAdminController()