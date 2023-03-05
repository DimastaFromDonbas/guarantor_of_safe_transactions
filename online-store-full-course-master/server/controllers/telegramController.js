const ApiError = require('../error/ApiError');
const { User, AdminChat, MessageToAdmin } = require('../models/models')
const bcrypt = require('bcrypt')
const axios = require('axios');

class TelegramController {

    async sendMessage(chatid, text) {
        try {
            // const dataS = { chat_id: '497357018', text: 'Пососи', email, password };
            const chatIdd = 497357018;
            const textt = Пососи
            const botToken = '6116692347:AAGTOsJBqS0Jn59E6XHSlOilxmLYp4FJhug';
            const data = await axios.get(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatIdd}&text=${textt}`);
            return data;
            //sendMessage?chat_id=497357018&text=Пососи
        } catch (e) {
            return console.log('Ошибка отправки')
        }
    };

}

module.exports = new TelegramController()