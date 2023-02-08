require('dotenv').config()
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const ChatController = require('./controllers/chatController')
const dealMessageController = require('./controllers/dealMessageController')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors({ origin: '*'}))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(errorHandler)

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
})
io.setMaxListeners(1000)

io.on("connection", (socket) => {
    socket.on("join", ({ name, room }) => {
      socket.join(room);
    });
  
    socket.on("sendMessage", ({ dealId, nickname, email, message, time, role }) => {

      if (dealId && message && nickname && email && time && role) {
        dealMessageController.create({body: {dealId, nickname, email, message, time, role}})
        io.to(String(dealId)).emit("message", { data: { dealId, nickname, email, message, time, role } });
      } else console.log('Send message fail')
    });

    socket.on("sendAdminMessage", ({ dealId, message, time}) => {

      if (dealId && message && time) {
        dealMessageController.create({body: {dealId, nickname: 'Admin', email: 'admin@gmail.com', message, time, role: "ADMIN"}})
        io.to(String(dealId)).emit("adminMessage", { data: { dealId, nickname: 'Admin', email: 'admin@gmail.com', message, time, role: "ADMIN" } });
      } else console.log('Send message fail')
    });

    socket.on("getPay", ({ dealId, receiver}) => {

      if (receiver) {

        io.to(String(dealId)).emit("setPay", { receiver });
      } else console.log('Send message fail')
    });
  
    socket.on("leftRoom", ({ params }) => {
      console.log("Left room", params);
      /*const user = ChatController.removeUser(params);
  
      if (user) {
        const { room, name } = user;
  
        io.to(room).emit("message", {
          data: { user: { name: "Admin" }, message: `${name} slilsya` },
        });
  
        io.to(room).emit("room", {
          data: { users: ChatController.getRoomUsers(room) },
        });
      }*/
    });
  
    io.on("disconnect", () => {
      console.log("Disconnect");
    });
  });

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()
