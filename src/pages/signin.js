import Api from '../utils/Api.js';

export default {
    /**
     * HTML-шаблон для страницы входа (авторизации) с формой ввода логина и пароля,
     * кнопкой для регистрации и навигационными элементами.
     *
     * @type {string}
     */
    html:
        `
    <header class="header">
        <div class="logo">
            <img src="/src/static/logo.png" alt="Логотип" class="logo-image" id="homeLogo">
        </div>
    </header>
    <main>
        <div class="auth-block">
            <div class="back-button" id="back-button">←</div>
            <div class="auth-title">Вход</div>
            <div class="error-message" id="error-message">ЗДЕСЬ БУДЕТ ОШИБКА</div>
            <form id="signin-form">
                <label class="auth-text">Логин</label>
                <input class="border" id="login" name="login" required>
                <label class="auth-text">Пароль</label>
                <input class="border" type = "password" id="password" name="password" required>
                <div class="remember-me-container">
                    <input class="custom-check-icon" type="checkbox" id="remember-me" name="remember-me">
                    <label class="remember-me">Запомнить меня</label>
                </div>
                <button class="auth-button">Войти</button>
                <div class="auth-signup-button" id="signupButton">СОЗДАТЬ АККАУНТ</div>
            </form>
        </div>
    </main>
    `,

    /**
     * Функция для монтирования страницы авторизации, привязки событий
     * к элементам страницы и обработки формы входа.
     *
     * @param {Router} router - Экземпляр роутера для управления переходами между страницами.
     * @returns {Promise<void>} Промис, который выполняется после монтирования страницы.
     */
    async mount(router) {
        document.getElementById('signupButton').addEventListener('click', () => {
            router.goto('/signup');
        });
        document.getElementById('homeLogo').addEventListener('click', () => {
            router.goto('/home');
        });
        document.getElementById('back-button').addEventListener('click', () => {
            router.goto('/home');
        });

        document.getElementById('signin-form').addEventListener('submit', async (event) => {
            event.preventDefault();

            const formUsername = document.getElementById('login').value;
            const formPassword = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');

            if (formPassword.length < 8) {
                errorMessage.textContent = 'Пароль должен быть не короче 8 символов';
                errorMessage.classList.add('visible');
                return;
            }

            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!passwordRegex.test(formPassword)) {
                errorMessage.textContent = 'Должна быть как минимум 1 буква и цифра';
                errorMessage.classList.add('visible');
                return;
            }

            await Api.postSignin(formUsername, formPassword);
        });
    },

    /**
     * Функция размонтирования страницы.
     * Используется для очистки состояния или удаления обработчиков событий при переходе на другую страницу.
     */
    unmount() {

    },
};
