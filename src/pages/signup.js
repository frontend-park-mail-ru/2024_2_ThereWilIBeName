import Api from "../utils/Api.js";

export default {
    html:
        `
        <header class="header">
            <div class="logo">
                <img src="/src/static/logo.png" alt="Логотип" class="logo-image" id="home-logo">
            </div>
        </header>
        <main>
        <div class="reg-block">
            <div class="auth-text" id ="backButton">←</div>
            <h2 class="auth-title">Регистрация</h2>
            <div class="error-message" id="error-message"></div>
            <form id="signupForm">
                <label class="auth-text" for="login">Логин</label>
                <input class="border" id="login" name="login" >
                <label class="auth-text" for="password">Пароль</label>
                <input class="border" type="password" id="password" name="password">
                <label class="auth-text" for="confirm-password">Подтверждение пароля</label>
                <input class="border" type="password" id="confirm-password" name="confirm-password">
                <button class="auth-button">Зарегистрироваться</button>
            </form>
        </div>
        
        </main>
    `,

    async mount(router) {
        document.getElementById('backButton').addEventListener('click', () => {
            router.goto('/signin');
        });
        document.getElementById('home-logo').addEventListener('click', () => {
            router.goto('/home');
        });

        document.getElementById('signupForm').addEventListener('submit', async (event) => {
            event.preventDefault();

            const formUsername = document.getElementById('login').value;
            const formPassword = document.getElementById('password').value;
            const formConfirmPassword = document.getElementById('confirm-password').value;
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

            if (formPassword !== formConfirmPassword) {
                errorMessage.textContent = 'Пароли не совпадают';
                errorMessage.style.opacity = 1;
                return;
            }

            const jsonData = JSON.stringify({
                username: formUsername,
                password: formPassword,
            });

            await Api.postSignup(jsonData);
            router.goto('/signin');
        });
    },

    unmount() {

    },
};
