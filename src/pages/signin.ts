import Api from '../utils/Api.js';
import Router from '../utils/Router.js'

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
            <img src="/src/static/logo.png" alt="Логотип" class="logo-image" id="home-logo">
        </div>
    </header>
    <main>
        <div class="auth-block">
            <div class="back-button" id="back-button">←</div>
            <div class="auth-title">Вход</div>
            <div class="error-message" id="error-message">ЗДЕСЬ БУДЕТ ОШИБКА</div>
            <form id="signin-form">
                <label class="auth-text">Email</label>
                <input class="border" id="email" name="email" required>
                <label class="auth-text">Пароль</label>
                <input class="border" type = "password" id="password" name="password" required>
                <div class="remember-me-container">
                    <input class="custom-check-icon" type="checkbox" id="remember-me" name="remember-me">
                    <label class="remember-me">Запомнить меня</label>
                </div>
                <button class="auth-button">Войти</button>
                <div class="auth-signup-button" id="signup-button">СОЗДАТЬ АККАУНТ</div>
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
    async mount(router: Router): Promise<void> {
        const signupButton = document.getElementById('signup-button') as HTMLButtonElement;
        signupButton!.addEventListener('click', () => {
            router.goto('/signup');
        });
        const homeLogo = document.getElementById('home-logo') as HTMLElement;
        homeLogo!.addEventListener('click', () => {
            router.goto('/home');
        });
        const backButton = document.getElementById('back-button') as HTMLButtonElement;
        backButton!.addEventListener('click', () => {
            router.goto('/home');
        });
        const signinForm = document.getElementById('signin-form') as HTMLElement;
        const errorMessage = document.getElementById('error-message') as HTMLElement;

        signinForm!.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formEmail = (document.getElementById('email') as HTMLInputElement).value;
            const formPassword = (document.getElementById('password') as HTMLInputElement).value;

            const res = await Api.postSignin(formEmail, formPassword);

            if (!res.ok) {
                errorMessage.textContent = 'Неверный email или пароль';
                errorMessage.classList.add('visible');
            } else {
                router.goto('/home');
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
