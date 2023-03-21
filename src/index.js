const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))

io.on('connection', () => {
    console.log('New WebSocket connection')
})


server.listen(port, () => {
    console.log('Server is running on port', port)
})