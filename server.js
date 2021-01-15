// const io = require("socket.io")(5000)
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
// app.use( express.static(__dirname + '/../../build'))
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

io.on('connection', socket => {
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on("send-message", ({ recipients, text }) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients, sender: id, text
            })
        })
    })
})