import Api from '../utils/Api';
import Router from '../utils/Router';
import {emailRegex} from './validation';
import {passwordRegex} from './validation';

export default {
    /**
     * HTML-шаблон для страницы регистрации, содержащий форму для ввода логина, email, пароля
     * и подтверждения пароля, а также элементы для навигации на другие страницы.
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
                    <label class="reg-text">Логин</label>
                    <input class="border" id="login" name="login" >
                    <label class="reg-text">Email</label>
                    <input class="border" id="email" name="email" >
                    <label class="reg-text">Пароль</label>
                    <input class="border" type="password" id="password" name="password">
                    <label class="reg-text">Подтверждение пароля</label>
                    <input class="border" type="password" id="confirm-password" name="confirm-password">
                    <button class="auth-button">Зарегистрироваться</button>
                </form>
            </div>
        </main>
    `,

    /**
     * Функция для монтирования страницы регистрации.
     * Подключает обработчики событий для элементов страницы и обрабатывает логику регистрации.
     *
     * @async
     * @param {Router} router - Экземпляр класса Router для навигации между страницами.
     * @returns {Promise<void>} Промис, который выполняется после установки всех обработчиков событий на странице.
     */
    async mount(router: Router): Promise<void> {
        const backButton = document.getElementById('back-button') as HTMLButtonElement;
        backButton.addEventListener('click', () => {
            router.goto('/signin');
        });

        const homeLogo = document.getElementById('home-logo') as HTMLElement;
        homeLogo.addEventListener('click', () => {
            router.goto('/home');
        });

        const signupForm = document.getElementById('signup-form') as HTMLElement;
        const errorMessage = document.getElementById('error-message') as HTMLElement;

        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formUsername = (document.getElementById('login') as HTMLInputElement).value.trim();
            const formEmail = (document.getElementById('email') as HTMLInputElement).value.trim().toLowerCase();
            const formPassword = (document.getElementById('password') as HTMLInputElement).value;
            const formConfirmPassword = (document.getElementById('confirm-password') as HTMLInputElement).value;

            if (!emailRegex.test(formEmail)) {
                errorMessage.textContent = 'Неверный email';
                errorMessage.classList.add('visible');
                return;
            }

            if (formPassword.length < 8) {
                errorMessage.textContent = 'Пароль должен быть не короче 8 символов';
                errorMessage.classList.add('visible');
                return;
            }

            if (!passwordRegex.test(formPassword)) {
                errorMessage.textContent = 'Пароль должен включать букву, цифру и символ';
                errorMessage.classList.add('visible');
                return;
            }

            if (formPassword !== formConfirmPassword) {
                errorMessage.textContent = 'Пароли не совпадают';
                errorMessage.classList.add('visible');
                return;
            }



            const res = await Api.postSignup(formUsername, formEmail, formPassword);

            if (!res.ok) {
                errorMessage.textContent = 'Логин уже занят';
                errorMessage.classList.add('visible');
                return;
            }

            router.goto('/home');
        });
    },

    /**
     * Функция для размонтирования страницы регистрации.
     * Используется для очистки состояния страницы или удаления обработчиков событий
     * при переходе на другую страницу.
     */
    unmount() {
        // Оставлено пустым, так как текущая реализация не требует очистки обработчиков.
    },
};
