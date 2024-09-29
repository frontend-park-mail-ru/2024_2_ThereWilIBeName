import Api from '../utils/Api.js';

export default {
    html:
        `
    <header class="header">
        <div class="logo">
            <img src="./src/static/logo.png" alt="Логотип" class="logo-image" id="homeLogo">
        </div>
    </header>
    <main>
        <div class="auth-block">
            <div class="auth-text" id="backButton">←</div>
            <h2 class="auth-title">Вход</h2>
            <div class="error-message" id="error-message"></div>
            <form id="signinForm">
                <label class="auth-text" for="login">Логин</label>
                <input class="border" id="login" name="login" required>
                <label class="auth-text" for="password">Пароль</label>
                <input class="border" type = "password" id="password" name="password" required>
                <div class="remember-me-container">
                    <input class="custom-check-icon" type="checkbox" id="remember-me" name="remember-me">
                    <label class="remember-me">Запомнить меня</label>
                </div>
                <button class="auth-button">Войти</button>
            <div class="auth-title" id="signupButton" style="font-size: 18px; margin-top: 15px;">СОЗДАТЬ АККАУНТ</div>
            </form>
        </div>
    </main>
    `,

    async mount(router) {
        document.getElementById('signupButton').addEventListener('click', () => {
            router.goto('/signup');
        });
        document.getElementById('homeLogo').addEventListener('click', () => {
            router.goto('/home');
        });
        document.getElementById('backButton').addEventListener('click', () => {
            router.goto('/home');
        });

        document.getElementById('signinForm').addEventListener('submit', async (event) => {
            event.preventDefault();

            const formUsername = document.getElementById('login').value;
            const formPassword = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');
            errorMessage.style.opacity = 0;
            errorMessage.textContent = '';

            if (formPassword.length < 8) {
                errorMessage.textContent = 'Пароль должен быть не короче 8 символов';
                errorMessage.style.opacity = 1;
                return;
            }

            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!passwordRegex.test(formPassword)) {
                errorMessage.textContent = 'Пароль должен включать как минимум 1 букву и символ'
                errorMessage.style.opacity = 1;
                return;
            }

            const jsonData = JSON.stringify({
                username: formUsername,
                password: formPassword,
            });

            await Api.postSignin(jsonData);
        });
    },

    unmount() {

    },
};
