const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let clickCount = 0;

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.emit('updateCount', clickCount);

    socket.on('buttonClicked', () => {
        clickCount++;
        io.emit('updateCount', clickCount);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
