const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public')); // Serve static files

// Socket.io connection handler
io.on('connection', (socket) => {
    console.log('a user connected');

    // When a message is received
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Broadcast to everyone
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
