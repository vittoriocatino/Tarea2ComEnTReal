// Check if user already has a username in session
document.addEventListener('DOMContentLoaded', () => {
    const username = sessionStorage.getItem('chatUsername');
    
    if (username) {
        // User already logged in, redirect to rooms
        window.location.href = '/rooms';
        return;
    }

    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        
        if (username.length < 2) {
            errorMessage.textContent = 'El nombre debe tener al menos 2 caracteres';
            return;
        }
        
        if (username.length > 20) {
            errorMessage.textContent = 'El nombre no puede tener más de 20 caracteres';
            return;
        }
        
        // Store username in sessionStorage
        sessionStorage.setItem('chatUsername', username);
        
        // Redirect to rooms page
        window.location.href = '/rooms';
    });

    // Clear error message when user types
    usernameInput.addEventListener('input', () => {
        errorMessage.textContent = '';
    });
});
