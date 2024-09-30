import Api from '../utils/Api.js';

export default {
    /**
     * HTML-шаблон для страницы регистрации, содержащий форму ввода логина, пароля и подтверждения пароля,
     * а также навигационные элементы для перехода на другие страницы.
     *
     * @type {string}
     */
    html:
        `
        <header class="header">
            <div class="logo">
                <img src="/src/static/logo.png" alt="Логотип" class="logo-image" id="home-logo">
            </div>
        </header>
        <main>
        <div class="reg-block">
            <div class="back-button" id ="back-button">←</div>
            <div class="auth-title">Регистрация</div>
            <div class="error-message" id="error-message">ЗДЕСЬ БУДЕТ ОШИБКА</div>
            <form id="signup-form">
                <label class="auth-text">Логин</label>
                <input class="border" id="login" name="login" >
                <label class="auth-text">Пароль</label>
                <input class="border" type="password" id="password" name="password">
                <label class="auth-text">Подтверждение пароля</label>
                <input class="border" type="password" id="confirm-password" name="confirm-password">
                <button class="auth-button">Зарегистрироваться</button>
            </form>
        </div>
        
        </main>
    `,

    /**
     * Функция для монтирования страницы регистрации, которая связывает элементы интерфейса
     * с обработчиками событий и обрабатывает процесс регистрации пользователя.
     *
     * @param {Router} router - Экземпляр роутера для управления навигацией между страницами.
     * @returns {Promise<void>} Промис, который выполняется после монтирования страницы.
     */
    async mount(router) {
        document.getElementById('back-button').addEventListener('click', () => {
            router.goto('/signin');
        });
        document.getElementById('home-logo').addEventListener('click', () => {
            router.goto('/home');
        });

        document.getElementById('signup-form').addEventListener('submit', async (event) => {
            event.preventDefault();

            const formUsername = document.getElementById('login').value;
            const formPassword = document.getElementById('password').value;
            const formConfirmPassword = document.getElementById('confirm-password').value;
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

            if (formPassword !== formConfirmPassword) {
                errorMessage.textContent = 'Пароли не совпадают';
                errorMessage.classList.add('visible');
                return;
            }

            const res = await Api.postSignup(formUsername, formPassword);

            if (!res.ok) {
                errorMessage.textContent = 'Логин уже занят';
                errorMessage.classList.add('visible');
            } else {
                router.goto('/signin');
            }
        });
    },

    /**
     * Функция размонтирования страницы.
     * Используется для очистки состояния или удаления обработчиков событий при переходе на другую страницу.
     */
    unmount() {

    },
};
