const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))

let count = 0

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('message', 'Welcome!')

    socket.broadcast.emit('message', 'New user connected!')

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if(filter.isProfane(message)){
            return callback('Profanity is not allowed')
        }

        io.emit('message', message)
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        io.emit('message', `http://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', 'User disconnected!')
    })
})



server.listen(port, () => {
    console.log('Server is running on port', port)
})