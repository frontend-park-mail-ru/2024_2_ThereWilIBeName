import Router from '../../utils/Router';
import Api from '../../utils/Api';
import User from '../../utils/user';
import updateMenu from './profileMenu';

export default {
    /**
     * HTML-шаблон для страницы профиля с предупреждающим сообщением и кнопкой
     * для перехода на главную страницу.
     *
     * @type {string}
     */
    html: `<header class="header">
            <div class="logo">
                <img src="/logo.png" alt="Логотип" class="logo-image" id="home-logo">
            </div>
        </header>
        <main>
            <div class="background-profile">
                <div class="user-block">
                    <img src="/avatar.png" alt="Аватар" class="avatar">
                    <div class="user-information">
                        <div class="information-block">
                            <div class="information-text-title" id="user-title">Здесь будет Username</div>
                        </div>
                        <div class="information-block">
                            <div class="information-user-row">
                                <div class="information-text-bold">Username</div>
                                <div class="information-text" id="user-username">Здесь будет username</div>
                                <div class="edit-button">
                                    <img src="/edit.png" alt="edit" class="edit-icon">
                                </div>
                            </div>
                            <div class="information-user-row">
                                <div class="information-text-bold">Email</div>
                                <div class="information-text" id="user-email">Здесь будет email</div>
                            </div>
                            <div class="information-user-row">
                                <div class="information-text-bold" >ID</div>
                                <div class="information-text" id="user-id">Здесь будет id</div>
                            </div>
                        </div>
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
                            <ul class="gallery-profile" id="gallery-profile">Здесь будут поездки</ul>
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
        const homeLogo = document.getElementById('home-logo') as HTMLElement;
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
