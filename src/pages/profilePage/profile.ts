import Router from '../../utils/Router';
import Api from '../../utils/Api';
import User from '../../utils/user';
import updateMenu from './profileMenu';

import logoImage from '../../static/logo.png';
import defaultAvatar from '../../static/avatar.png';
import editButton from '../../static/edit.png';
import confirmIcon from '../../static/confirm.png';

export default {
    /**
     * HTML-шаблон для страницы профиля с предупреждающим сообщением и кнопкой
     * для перехода на главную страницу.
     *
     * @type {string}
     */
    html: `<header class="header">
            <div class="logo">
                <img src="${logoImage}" alt="Логотип" class="logo-image" id="logo-image">
            </div>
        </header>
        <main>
            <div class="background-profile">
                <div class="user-block">
                    <img src="${defaultAvatar}" alt="Аватар" class="avatar">
                    <div class="user-information">
                        <div class="information-block">
                            <div class="information-text-title" id="user-title">Здесь будет Username</div>
                        </div>
                        <div class="information-block">
                            <div class="information-user-row">
                                <div class="information-text-bold">Username</div>
                                <div class="information-text" id="user-username">Здесь будет username</div>
                                <input class="edit-profile-input hidden" type="text" id="username-input">
                                <img src="${editButton}" alt="edit" class="edit-button" id="edit-button">
                            </div>
                            <div class="information-user-row">
                                <div class="information-text-bold">Email</div>
                                <div class="information-text" id="user-email">Здесь будет email</div>
                                <input class="edit-profile-input hidden" type="text" id="email-input">
                            </div>
                            <div class="information-user-row">
                                <div class="information-text-bold" >ID</div>
                                <div class="information-text" id="user-id">Здесь будет id</div>
                                <img src="${confirmIcon}" alt="confirm" class="submit-edit-button hidden" id="submit-edit-button">
                            </div>
                        </div>
                        <div class="change-password-button" id="change-password-button">Сменить пароль</div>
                    </div>
                    <div class="information-back-button" id="back-button">←</div>
                </div>
                <div class="profile-block">
                    <div class="profile-menu-row">
                        <div class="profile-menu-passive-left" id="left-menu-button">Достижения</div>
                        <div class="profile-menu-active" id="active-menu-button">Поездки</div>
                        <div class="profile-menu-passive-right" id="right-menu-button">Отзывы</div>      
                    </div>
                    <hr>
                    <div>
                        <div id="profile-root">
                            <ul class="gallery-profile" id="gallery-profile">Здесь будут ваши поездки</ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>`,

    /**
     * Функция для монтирования страницы профиля, которая добавляет обработчик события
     * на кнопку для перехода на главную страницу.
     *
     * @async
     * @param {Router} router - Экземпляр класса Router для управления навигацией между страницами.
     * @returns {Promise<void>} Промис, который выполняется после установки обработчика события.
     */
    async mount(router: Router): Promise<void> {
        const homeLogo = document.getElementById('logo-image') as HTMLElement;
        homeLogo.addEventListener('click', () => {
            router.goto('/home');
        });

        const backButton = document.getElementById('back-button') as HTMLButtonElement;
        backButton.addEventListener('click', () => {
            router.goto('/home');
        });

        // Проверка информации о текущем пользователе

        if (User.username === '') {
            const currentUser = await Api.getUser();
            User.username = currentUser.data.username;
            User.id = currentUser.data.id;
            User.email = currentUser.data.email;
        }

        const userTitle = document.getElementById('user-title') as HTMLElement;
        const userUserName = document.getElementById('user-username') as HTMLElement;
        const userEmail = document.getElementById('user-email') as HTMLElement;
        const userId = document.getElementById('user-id') as HTMLElement;

        userTitle.textContent = User.username.charAt(0).toUpperCase() + User.username.slice(1);
        userUserName.textContent = User.username;
        userEmail.textContent = User.email;
        userId.textContent = User.id;


        const editButton = document.getElementById('edit-button') as HTMLButtonElement;
        const submitEditButton = document.getElementById('submit-edit-button') as HTMLButtonElement;
        const usernameInput = document.getElementById('username-input') as HTMLInputElement;
        const emailInput = document.getElementById('email-input') as HTMLInputElement;

        editButton.addEventListener('click', () => {
            editButton.classList.toggle('active');
            submitEditButton.classList.toggle('hidden');
            usernameInput.classList.toggle('hidden');
            emailInput.classList.toggle('hidden');
            userUserName.classList.toggle('hidden');
            userEmail.classList.toggle('hidden');
        });

        const leftMenuButton = document.getElementById('left-menu-button') as HTMLButtonElement;
        const rightMenuButton = document.getElementById('right-menu-button') as HTMLButtonElement;
        const activeMenuButton = document.getElementById('active-menu-button') as HTMLButtonElement;
        let leftMenuText = leftMenuButton.textContent as string;
        let rightMenuText = rightMenuButton.textContent as string;
        let centerMenuText = activeMenuButton.textContent as string;

        leftMenuButton.addEventListener('click', () => {
            leftMenuButton.textContent = rightMenuText;
            rightMenuButton.textContent = centerMenuText;
            activeMenuButton.textContent = leftMenuText;
            updateMenu(activeMenuButton);
            leftMenuText = leftMenuButton.textContent;
            rightMenuText = rightMenuButton.textContent;
            centerMenuText = activeMenuButton.textContent;
        });

        rightMenuButton.addEventListener('click', () => {
            leftMenuButton.textContent = centerMenuText;
            rightMenuButton.textContent = leftMenuText;
            activeMenuButton.textContent = rightMenuText;
            updateMenu(activeMenuButton);
            leftMenuText = leftMenuButton.textContent;
            rightMenuText = rightMenuButton.textContent;
            centerMenuText = activeMenuButton.textContent;
        });

        updateMenu(activeMenuButton);

    },

    /**
     * Функция размонтирования страницы профиля.
     * Используется для очистки состояния или удаления обработчиков событий при переходе на другую страницу.
     */
    unmount() {
        // Оставлено пустым, так как текущая реализация не требует очистки обработчиков.
    },
};
