const path = require('path')
const express = require('express')
const SocketIO = require('socket.io')

const app = express()

app.set('port', process.env.PORT || 3000)

app.use(express.static(path.join(__dirname, 'build')))

const server = app.listen(app.get('port'), () => {
    console.log("Listening on " + app.get('port'))
})

const io = SocketIO(server)

io.on('connection', socket => {
    console.log("New Connection")
    socket.on("disconnect", () => {
        console.log("Client left")
    })
})