import Api from '../utils/Api';
import Router from '../utils/Router';
import User from '../utils/user';

import logoImage from '../static/logo.png';

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
                <img src="${logoImage}" alt="Логотип" class="logo-image" id="home-logo">
            </div>
        </header>
        <main>
            <div class="change-password-block">
                <div class="back-button" id ="back-button">←</div>
                <div class="change-password-title">Смена пароля</div>
                <div class="error-message" id="error-message">ЗДЕСЬ БУДЕТ ОШИБКА</div>
                <form id="change-password-form">
                    <label class="change-password-text">Старый пароль</label>
                    <input class="border" id="old-password" name="old-password" >
                    <label class="change-password-text">Новый пароль</label>
                    <input class="border" id="new-password" name="new-password" autocomplete="new-password">
                    <label class="change-password-text">Введите новый пароль ещё раз</label>
                    <input class="border" id="retype-new-password" name="retype-new-password" >
                    <button class="change-password-button">Сменить пароль</button>
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
            router.goto('/profile');
        });

        const homeLogo = document.getElementById('home-logo') as HTMLElement;
        homeLogo.addEventListener('click', () => {
            router.goto('/home');
        });

        const createTripForm = document.getElementById('change-password-form') as HTMLElement;
        const errorMessage = document.getElementById('error-message') as HTMLElement;

        createTripForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formOldPassword = (document.getElementById('old-password') as HTMLInputElement).value;
            const formNewPassword = (document.getElementById('new-password') as HTMLInputElement).value;
            const formRetypePassword = (document.getElementById('retype-new-password') as HTMLInputElement).value;

            if (formOldPassword === formNewPassword) {
                errorMessage.textContent = 'Новый пароль такой же';
                errorMessage.classList.add('visible');
                return;
            }

            if (formRetypePassword !== formNewPassword) {
                errorMessage.textContent = 'Введите новый пароль ещё раз';
                errorMessage.classList.add('visible');
                return;
            }

            const res = await Api.putChangePassword(User.id, formOldPassword, formNewPassword);

            if (!res.ok) {
                errorMessage.textContent = 'Ошибка смены пароля';
                errorMessage.classList.add('visible');
                return;
            }

            await router.goto('/profile');
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
