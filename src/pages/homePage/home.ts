import Api from '../../utils/Api';
import User from '../../utils/user';
import Router from '../../utils/Router';
import galleryTemplate from './home.hbs';
import headerMount from '../headerMount';

import logoImage from '../../static/logo.png';

export default {
    /**
     * HTML-шаблон главной страницы, отображающей заголовок, меню пользователя и галерею достопримечательностей.
     *
     * @type {string}
     */
    html: `
        <header class="header">
            <div class="logo">
                <img src="${logoImage}" alt="Логотип" class="logo-image" id="logo-image">
            </div>
            <div class="header-menu">
                <button class="header-button" id="trips-button">Поездки</button>
                <button class="header-button" id="signin-button">вход</button>
                <button class="user-button" id="user-button"></button>
                
                <div id="side-menu" class="side-menu">
                    <div class="background-menu" id="background-menu"></div>
                    <div class="user-name" id="user-name"></div>
                    <ul>
                        <li><button class="menu-button" id="change-user-button">Сменить пользователя</button></li>
                        <li><button class="menu-button" id="profile-button">Профиль</button></li>
                        <li><button class="menu-button" id="logout-button">Выйти</button></li>
                    </ul>
                    <button id="close-button" class="close-button">Закрыть</button>
                </div>
            </div>
        </header>
        <main>
            <div class="headline">Достопримечательности</div>
            <ul class="gallery" id="gallery"></ul>
        </main>`,

    /**
     * Функция монтирования главной страницы.
     * Устанавливает обработчики событий для кнопок, загружает достопримечательности и информацию о текущем пользователе.
     *
     * @async
     * @param {Router} router - Экземпляр класса Router для управления навигацией между страницами.
     * @returns {Promise<void>} Промис, который выполняется после завершения монтирования страницы.
     */
    async mount(router: Router): Promise<void> {
        const tripsButton = document.getElementById('trips-button') as HTMLButtonElement;
        const placeButton = document.getElementById('gallery') as HTMLButtonElement;

        // Монтирование хэдера
        const homeLogo = document.getElementById('logo-image') as HTMLElement;
        const signinButton = document.getElementById('signin-button') as HTMLButtonElement;
        const userButton = document.getElementById('user-button') as HTMLButtonElement;
        const sideMenu = document.getElementById('side-menu') as HTMLElement;
        const userNameDiv = document.getElementById('user-name') as HTMLElement;
        const backgroundMenu = document.getElementById('background-menu') as HTMLElement;
        const profileButton = document.getElementById('profile-button') as HTMLButtonElement;
        const closeButton = document.getElementById('close-button') as HTMLButtonElement;
        const logoutButton = document.getElementById('logout-button') as HTMLButtonElement;
        const changeUserButton = document.getElementById('change-user-button') as HTMLButtonElement;
        await headerMount(router, sideMenu, userButton, closeButton, backgroundMenu, profileButton, changeUserButton, signinButton, logoutButton, homeLogo, userNameDiv);

        tripsButton.addEventListener('click', () => {
            router.goto('/trips');
        });

        // Загрузка достопримечательностей
        const attractionsResponse = await Api.getAttractions();
        const attractions = attractionsResponse.data;
        const galleryElement = document.getElementById('gallery') as HTMLElement;
        galleryElement.innerHTML = galleryTemplate({ attractions });

        placeButton.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target) {
                const listItem = target.closest('li');
                if (listItem) {
                    const itemId = listItem.querySelector('a')!.href.split('/').pop();
                    router.goto(`/places/${itemId}`);
                }
            }
        });
    },

    /**
     * Функция размонтирования главной страницы.
     * Используется для очистки состояния или удаления обработчиков событий при переходе на другую страницу.
     */
    unmount() {
        // Оставлено пустым, так как текущая реализация не требует очистки обработчиков.
    },
};
