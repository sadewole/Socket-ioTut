const express = require('express')
const socket = require('socket.io')

const app = express()

// set up static file
app.use(express.static('public'))

const PORT = process.env.PORT || 4000

const server = app.listen(PORT, () => console.log(`Connected to port: ${PORT}`))

// socket setup
const io = socket(server)

io.on('connection', (socket) => {
    console.log('Made a socket connection')
    // create chat
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })
    // broading handle when typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
})