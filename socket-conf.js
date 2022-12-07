const express = require('express');
const { Server } = require('socket.io');
const app = express();

const server = require('http').createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:9001'
    }
})

let message = [];

io.on('connection', (socket) => {
    console.log("user connected!");

    socket.emit('welcome', message)

    socket.on('disconnect', () => {
        console.log("user disconnected!");
    });

    socket.on('addMessage', (data, type) => {
        if (data.length > 0) {
            if (message.length >= 5) {
                message.shift();
            };

            type === 'first' ? message.unshift(data) : message.push(data);

            io.emit('addMessage', message);
        };
    });

    socket.on('deleteMessage', (data) => {
        if (message.length > 0) {
            data === 'first' ? message.shift() : message.pop();
            io.emit('deleteMessage', message)
        }
    })

});

const PORT = 9000
server.listen(PORT, () => {
    console.log("socket at port: " + PORT)
});