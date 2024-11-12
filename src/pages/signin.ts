import Api from '../utils/Api';
import Router from '../utils/Router';

import logoImage from '../static/logo.svg';
// import backButton from '../static/back button white.svg';

export default {
    /**
     * HTML-шаблон для страницы входа (авторизации) с формой для ввода email и пароля,
     * кнопкой для создания аккаунта и навигационными элементами для перехода на другие страницы.
     *
     * @type {string}
     */
    html:
        `
    <img src="${logoImage}" alt="Логотип" class="logo-image" id="home-logo">
    <main>
        <div class="auth-block">
            <img src="" class="back-button" id="back-button">
            <div class="auth-title">Вход</div>
            <div class="error-message" id="error-message">ЗДЕСЬ БУДЕТ ОШИБКА</div>
            <form class="signin-form" id="signin-form">
                <label class="auth-text">Email</label>
                <input class="border" id="email" name="email" autocomplete="email" required>
                <label class="auth-text">Пароль</label>
                <input class="border" type="password" id="password" name="password" autocomplete="current-password" required>
                <button class="auth-button">Войти</button>
                <div class="auth-line">
                <div class="auth-signup-button" id="signup-button">Создать аккаунт</div>
            </form>
        </div>
    </main>
    `,

    /**
     * Функция для монтирования страницы авторизации, которая добавляет обработчики событий
     * для элементов интерфейса и обрабатывает вход пользователя.
     *
     * @async
     * @param {Router} router - Экземпляр класса Router для управления навигацией между страницами.
     * @returns {Promise<void>} Промис, который выполняется после установки всех обработчиков событий на странице.
     */
    async mount(router: Router): Promise<void> {
        const signupButton = document.getElementById('signup-button') as HTMLButtonElement;
        const formEmailElement = document.getElementById('email') as HTMLInputElement;
        const formPasswordElement = document.getElementById('password') as HTMLInputElement;

        signupButton.addEventListener('click', () => {
            router.goto('/signup');
        });

        const homeLogo = document.getElementById('home-logo') as HTMLElement;
        homeLogo.addEventListener('click', () => {
            router.goto('/home');
        });

        const backButton = document.getElementById('back-button') as HTMLButtonElement;
        backButton.addEventListener('click', () => {
            router.goto('/home');
        });

        const signinForm = document.getElementById('signin-form') as HTMLElement;
        const errorMessage = document.getElementById('error-message') as HTMLElement;

        signinForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formEmail = (formEmailElement).value.trim().toLowerCase();
            const formPassword = (formPasswordElement).value;

            const res = await Api.postSignin(formEmail, formPassword);

            if (!res.ok) {
                errorMessage.textContent = 'Неверный email или пароль';
                errorMessage.classList.add('visible');
                return;
            }

            router.goto('/home');
        });
    },

    /**
     * Функция для размонтирования страницы авторизации.
     * Используется для очистки состояния страницы или удаления обработчиков событий
     * при переходе на другую страницу.
     */
    unmount() {
        // Оставлено пустым, так как текущая реализация не требует очистки обработчиков.
    },
};
