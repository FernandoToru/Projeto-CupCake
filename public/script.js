document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('login-link');
    const modal = document.getElementById('login-modal');
    const span = document.getElementsByClassName('close')[0];

    loginLink.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Redirecionamentos
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    const forgotPassword = document.getElementById('forgot-password');

    loginButton.onclick = function() {
        window.location.href = 'login.html';
    }

    registerButton.onclick = function() {
        window.location.href = 'register.html';
    }

    forgotPassword.onclick = function() {
        window.location.href = 'forgot-password.html';
    }
});
