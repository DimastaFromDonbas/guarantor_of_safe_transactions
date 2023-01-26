const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role, nickname, score, password, systemMessage) => {
    return jwt.sign(
        {id, email, role, nickname, score, password, systemMessage},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role, nickname} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const checkNickname = await User.findOne({where: {nickname}})
        if (checkNickname) {
            return next(ApiError.badRequest('Пользователь с таким именем уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword, nickname})
        const systemMessage = 'false'
        const token = generateJwt(user.id, user.email, user.role, user.nickname, user.score, password, systemMessage)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}}) ?? await User.findOne({where: {nickname: email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {

            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role, user.nickname, user.score, password, user.systemMessage)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.nickname, req.user.score, req.user.password)
        return res.json({token})
    }

    async changeNickname(req, res, next) {
        const {nickname, id, password} = req.body
        const user = await User.findOne({where: {id}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const checkNickname = await User.findOne({where: {nickname}})
        if (checkNickname) {
            return next(ApiError.badRequest('Пользователь с таким именем уже существует'))
        }
        if (nickname) {
            await User.update({nickname: nickname}, {where: {id: id}})
           return res.json({...user.dataValues, nickname: nickname})
        } else {
            return next(ApiError.internal('Указано неверное имя пользователя'))
        }
    }

    async changePassword(req, res, next) {
        const {newPassword, id, password} = req.body
        const user = await User.findOne({where: {id}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        if (newPassword) {
            const hashPassword = await bcrypt.hash(newPassword, 5)
            await User.update({password: hashPassword}, {where: {id: id}})
           return res.json({...user.dataValues, password: newPassword})
        } else {
            return next(ApiError.internal('Указан неверный id пользователя'))
        }
    }

    async changeSystemMessage(req, res, next) {
        const {systemMessage, id, password} = req.body
        const user = await User.findOne({where: {id}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        if (systemMessage) {
            await User.update({systemMessage}, {where: {id: id}})
           return res.json({...user.dataValues, systemMessage})
        } else {
            return next(ApiError.internal('Указан неверный id пользователя'))
        }
    }

    async getAllUsers(req, res, next) {
        const users = await User.findAll()
        return res.json({users})
    }

}

module.exports = new UserController()
