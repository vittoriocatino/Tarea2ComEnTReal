// Check if user has a username in session
document.addEventListener('DOMContentLoaded', () => {
    const username = sessionStorage.getItem('chatUsername');
    
    if (!username) {
        // No username, redirect to login
        window.location.href = '/';
        return;
    }

    // Display username
    document.getElementById('displayUsername').textContent = username;

    // Handle room selection
    const roomCards = document.querySelectorAll('.room-card');
    roomCards.forEach(card => {
        card.addEventListener('click', () => {
            const roomId = card.getAttribute('data-room-id');
            // Redirect to chat room
            window.location.href = `/chat/${roomId}`;
        });
    });

    // Handle logout
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            sessionStorage.removeItem('chatUsername');
            window.location.href = '/';
        }
    });
});
