// const io = require("socket.io")(5000)
const express = require('express')
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

// const server = require('http').Server(app)
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}


// const io = require('socket.io')(server)
const io = require("socket.io")(server, {
    cors: {
      origin: process.env.SOCKET_URL || "http://localhost:5000",
      //ws: "//the-coders-corner.herokuapp.com/socket.io/?EIO=4&transport=websocket",
      methods: ["GET", "POST"],
    },
});



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