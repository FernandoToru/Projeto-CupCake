document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData.entries());

            if (data.password !== data['confirm-password']) {
                alert('Senha não correspondente');
                return;
            }

            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.text())
            .then(result => {
                alert(result);
                if (result === 'User registered successfully.') {
                    window.location.href = 'login.html';  // Redireciona para a página de login
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.text())
            .then(result => {
                alert(result);
                if (result === 'Login successful.') {
                    window.location.href = 'index.html';  // Redireciona para a página inicial
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }
});
