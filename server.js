const path = require('path')
const express = require('express')
const SocketIO = require('socket.io')

const app = express()

app.set('port', process.env.PORT || 3000)

// Servidor web
app.use(express.static(path.join(__dirname, 'build')))

const serverExpress = app.listen(app.get('port'), () => {
    console.log("Listening on " + app.get('port'))
})

const io = SocketIO(serverExpress)

io.on('connection', socket => {
    console.log("New Connection")
    socket.on("disconnect", () => {
        console.log("Client left")
    })
})