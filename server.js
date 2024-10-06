const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize Express
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Attach Socket.io to the server
const io = socketIo(server, {
    cors: {
        origin: "*", // Allow cross-origin requests, especially useful if using Nginx
        methods: ["GET", "POST"]
    }
});

// Socket.io connection handler
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for 'chat message' events
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Broadcast message to all connected users
    });

    // Handle user disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server on port 3000 (or another port if preferred)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
