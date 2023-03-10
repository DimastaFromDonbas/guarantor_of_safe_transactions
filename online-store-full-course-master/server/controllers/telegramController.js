const ApiError = require('../error/ApiError');
const { TelegramUsers, User, AdminChat, MessageToAdmin, Deal, DealMessage } = require('../models/models')
const bcrypt = require('bcrypt')
const axios = require('axios');

class TelegramController {

    async sendMessage(chatid, text) {
        try {
            if (!chatid || !text) return console.log('Введите все данные')
            const botToken = '6116692347:AAGTOsJBqS0Jn59E6XHSlOilxmLYp4FJhug';
            const data = await axios.get(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatid}&text=${text}`);
            return data;
            //sendMessage?chat_id=497357018&text=Пососи
        } catch (e) {
            return console.log('Ошибка отправки')
        }
    };

    async create(req, res, next) {
        const { name, chatid, email, password } = req.body
        if (!name || !chatid || !email || !password) {
            return next(ApiError.badRequest('Введите все данные'))
        }
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        if (user.role === 'USER') {
            return next(ApiError.badRequest('Нет доступа'))
        }
        const checkName = await TelegramUsers.findOne({ where: { name } })
        if (checkName?.name) {
            return next(ApiError.badRequest('Имя занято'))
        }
        const checkId = await TelegramUsers.findAll({ where: { chatid } })
        if (checkId?.chatid) {
            return next(ApiError.badRequest('chatid уже внесен'))
        }

        const userTransfertoUser = await TelegramUsers.create({ name, chatid })

        return res.json(userTransfertoUser)
    }

    async delete(req, res, next) {
        const { chatid, deleteName } = req.body
        if (!chatid || !deleteName) {
            return next(ApiError.badRequest('Введите все данные'))
        }
        const user = await TelegramUsers.findOne({ where: { chatid } })
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        const checkName = await TelegramUsers.findOne({ where: { name: deleteName } })
        if (!checkName) {
            return next(ApiError.badRequest('Пользователь  для удаления не найден'))
        }
        const deletedUser = await TelegramUsers.destroy({
            where: { name: deleteName }
        })

        return res.json(deletedUser)
    }

    async getAll(req, res, next) {
        const telegramUsers = await TelegramUsers.findAll()
        if (!res) return telegramUsers;
        return res.json({ telegramUsers })
    }

    async getAdminChats(req, res, next) {
        const { chatid } = req.body
        if (!chatid) {
            return next(ApiError.badRequest('Введите все данные'))
        }
        const telegramUsers = await TelegramUsers.findAll()
        if (!telegramUsers) {
            return next(ApiError.badRequest('Нет пользователей с доступом через telegram'))
        }
        if (!telegramUsers.filter(item => String(item.chatid) === String(chatid))[0]) {
            return next(ApiError.badRequest('Нет доступа'))
        }
        const adminChats = await AdminChat.findAll()
        if (!adminChats) {
            return next(ApiError.internal('Чаты не найдены'))
        }
        return res.json(adminChats)
    }

    async getAdminMessages(req, res, next) {
        const { chatid, email } = req.body
        if (!chatid || !email) {
            return next(ApiError.badRequest('Введите все данные'))
        }
        const telegramUsers = await TelegramUsers.findAll()
        if (!telegramUsers) {
            return next(ApiError.badRequest('Нет пользователей с доступом через telegram'))
        }
        if (!telegramUsers.filter(item => String(item.chatid) === String(chatid))[0]) {
            return next(ApiError.badRequest('Нет доступа'))
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
        return res.json(messages)
    }



    async getMessagesToAdmin(req, res, next) {
        const { chatid, email } = req.body
        if (!chatid || !email) {
            return next(ApiError.badRequest('Введите все данные'))
        }
        const telegramUsers = await TelegramUsers.findAll()
        if (!telegramUsers) {
            return next(ApiError.badRequest('Нет пользователей с доступом через telegram'))
        }
        if (!telegramUsers.filter(item => String(item.chatid) === String(chatid))[0]) {
            return next(ApiError.badRequest('Нет доступа'))
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
        return res.json(messages)
    }

    async getDeals(req, res) {
        const { chatid } = req.body
        if (!chatid) {
            return next(ApiError.badRequest('Введите все данные'))
        }
        const telegramUsers = await TelegramUsers.findAll()
        if (!telegramUsers) {
            return next(ApiError.badRequest('Нет пользователей с доступом через telegram'))
        }
        if (!telegramUsers.filter(item => String(item.chatid) === String(chatid))[0]) {
            return next(ApiError.badRequest('Нет доступа'))
        }
        const deals = await Deal.findAll()
        return res.json(deals)
    }

    async getDealMessages(req, res) {
        const { chatid, dealId } = req.body
        if (!chatid || !dealId) {
            return next(ApiError.badRequest('Введите все данные'))
        }
        const telegramUsers = await TelegramUsers.findAll()
        if (!telegramUsers) {
            return next(ApiError.badRequest('Нет пользователей с доступом через telegram'))
        }
        if (!telegramUsers.filter(item => String(item.chatid) === String(chatid))[0]) {
            return next(ApiError.badRequest('Нет доступа'))
        }
        const deal = await Deal.findOne({ where: { id: dealId } })
        if (!deal) {
            return next(ApiError.internal('Сделка не найдена'))
        }
        const dealMessages = await DealMessage.findAll({ where: { dealId } })
        if (!dealMessages) {
            return next(ApiError.internal('Сообщения не найдены'))
        }
        return res.json(dealMessages)
    }

}

module.exports = new TelegramController()