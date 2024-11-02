import Router from '../utils/Router';
import Api from '../utils/Api';
import User from '../utils/user';

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
                            <div class="information-text-title">Здесь будет Username</div>
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
                        <div class="profile-menu-passive-left">Достижения</div>
                        <div class="profile-menu-active">Поездки</div>
                        <div class="profile-menu-passive-right">Отзывы</div>      
                    </div>
                    <hr>
                    <div>
                        <div id="profile-root">
                            <ul class="trips-gallery" id="trips-gallery">Здесь будут поездки</ul>
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
        const currentUser = await Api.getUser();
        if (!currentUser.ok) {
            console.log('Пользователь не авторизован');
            return;
        }

        const leftMenuButton = document.getElementById('profile-menu-passive-left') as HTMLButtonElement;
        const rightMenuButton = document.getElementById('profile-menu-passive-right') as HTMLButtonElement;
        const activeMenuButton = document.getElementById('profile-menu-active') as HTMLButtonElement;
        const leftMenuText = leftMenuButton.textContent;
        const rightMenuText = rightMenuButton.textContent;
        const centerMenuText = activeMenuButton.textContent;
        leftMenuButton.addEventListener('click', () => {

        });




    },

    /**
     * Функция размонтирования страницы профиля.
     * Используется для очистки состояния или удаления обработчиков событий при переходе на другую страницу.
     */
    unmount() {
        // Оставлено пустым, так как текущая реализация не требует очистки обработчиков.
    },
};
