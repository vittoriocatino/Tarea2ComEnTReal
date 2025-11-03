// Check if user has a username in session
document.addEventListener('DOMContentLoaded', () => {
    const username = sessionStorage.getItem('chatUsername');
    
    if (!username) {
        // No username, redirect to login
        window.location.href = '/';
        return;
    }

    // Get room ID from URL
    const pathParts = window.location.pathname.split('/');
    const roomId = pathParts[pathParts.length - 1];

    // Room names mapping
    const roomNames = {
        'general': 'General',
        'tecnologia': 'Tecnología',
        'deportes': 'Deportes',
        'musica': 'Música',
        'random': 'Random'
    };

    // Display room name and username
    document.getElementById('roomName').textContent = `Sala: ${roomNames[roomId] || roomId}`;
    document.getElementById('currentUsername').textContent = username;

    // Initialize Socket.IO
    const socket = io();

    // Join the room
    socket.emit('join-room', { roomId, username });

    // DOM elements
    const messagesContainer = document.getElementById('messagesContainer');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const leaveRoomBtn = document.getElementById('leaveRoomBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userCountSpan = document.getElementById('userCount');

    // Helper function to format timestamp
    function formatTime(timestamp) {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // Helper function to add system message
    function addSystemMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message system-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    // Helper function to add chat message
    function addChatMessage(data, isOwn = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isOwn ? 'own-message' : 'other-message'}`;
        
        const time = formatTime(data.timestamp);
        
        messageDiv.innerHTML = `
            <div class="message-header">
                <span class="message-username">${data.username}</span>
                <span class="message-time">${time}</span>
            </div>
            <div class="message-content">
                <p>${escapeHtml(data.message)}</p>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    // Helper function to escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Helper function to scroll to bottom
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Handle sending messages
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const message = messageInput.value.trim();
        
        if (message) {
            socket.emit('send-message', { roomId, username, message });
            messageInput.value = '';
            messageInput.focus();
        }
    });

    // Listen for new messages
    socket.on('new-message', (data) => {
        const isOwn = data.socketId === socket.id;
        addChatMessage(data, isOwn);
    });

    // Listen for user joined
    socket.on('user-joined', (data) => {
        addSystemMessage(`👋 ${data.username} se ha unido a la sala`);
        userCountSpan.textContent = data.userCount;
    });

    // Listen for user left
    socket.on('user-left', (data) => {
        addSystemMessage(`👋 ${data.username} ha salido de la sala`);
        userCountSpan.textContent = data.userCount;
    });

    // Listen for room users update
    socket.on('room-users', (users) => {
        userCountSpan.textContent = users.length;
    });

    // Handle leaving room
    leaveRoomBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres salir de esta sala?')) {
            socket.emit('leave-room', { roomId, username });
            window.location.href = '/rooms';
        }
    });

    // Handle logout
    logoutBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            socket.emit('leave-room', { roomId, username });
            sessionStorage.removeItem('chatUsername');
            window.location.href = '/';
        }
    });

    // Handle page unload (close window/tab)
    window.addEventListener('beforeunload', () => {
        socket.emit('leave-room', { roomId, username });
    });

    // Focus on message input
    messageInput.focus();
});
