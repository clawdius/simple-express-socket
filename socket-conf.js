const express = require('express');
const { Server } = require('socket.io');
const app = express();

const server = require('http').createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:9001'
    }
})

io.on('connection', (socket) => {
    console.log("user connected!");

    socket.on('disconnect', () => {
        console.log("user disconnected!");
    });

    socket.on('addMessage', (data) => {
        if (data.length > 0) {
            io.emit('addMessage', data);
        };
    });

});

const PORT = 9000
server.listen(PORT, () => {
    console.log("socket at port: " + PORT)
});