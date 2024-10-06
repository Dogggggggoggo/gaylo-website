const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const errorMessage = document.getElementById('error-message');
const loginScreen = document.getElementById('login-screen');
const chatScreen = document.getElementById('chat-screen');
const messageInput = document.getElementById('message');
const chatBox = document.getElementById('chat-box');
const sendBtn = document.getElementById('send-btn');

// Password to access chat room
const correctPassword = 'chatroom123';

// Check password and show chat
loginBtn.addEventListener('click', () => {
    const password = passwordInput.value;
    if (password === correctPassword) {
        loginScreen.style.display = 'none';
        chatScreen.style.display = 'block';
    } else {
        errorMessage.textContent = 'Incorrect password. Please try again.';
    }
});

// Initialize Socket.io
const socket = io();

// Send message to server
sendBtn.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        socket.emit('chat message', message);
        messageInput.value = ''; // Clear input
    }
});

// Receive message from server and append to chat box
socket.on('chat message', (msg) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = msg;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
});
