import Router from '../../utils/Router';
import galleryTemplateTrips from './trips.hbs';
import Api from '../../utils/Api';

import logoImage from '../../static/logo.png';
import openIcon from '../../static/open.png';
import tripIcon from '../../static/trip_icon.png';
import copyLinkIcon from '../../static/copylink.png';
import deleteIcon from '../../static/delete.png';
import myBlackIcon from '../../static/232323.png';
import editIcon from '../../static/edit.png';
import User from '../../utils/user';
import Trip from '../../utils/trip';
import headerMount from '../headerMount';

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
            <div class="header-menu">
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
            <div class="trips-block">
                <div class="trips-title-row">
                    <div class="trips-title">Поездки</div>
                    <div class="trips-back-button" id="back-button">←</div>
                </div>
                <hr>
                <div class="trips-button-row">
                    <div class="trip-create-button hidden" id="trip-create-button">+</div>
                </div>
                <div id="trips-root">
                    <div class="auth-please" id="auth-please">Пожалуйста, авторизуйтесь</div>
                    <ul class="gallery-trips" id="gallery-trips"></ul>
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

        const backButton = document.getElementById('back-button') as HTMLButtonElement;
        const createTripButton = document.getElementById('trip-create-button') as HTMLButtonElement;
        const authPleaseMessage = document.getElementById('auth-please') as HTMLButtonElement;


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

        backButton.addEventListener('click', () => {
            router.goto('/home');
        });

        createTripButton.addEventListener('click', () => {
            router.goto('/createtrip');
        });

        if (User.username === '') {
            return;
        }

        authPleaseMessage.classList.add('hidden');
        createTripButton.classList.remove('hidden');

        const tripsResponse = await Api.getUserTrips(User.id);

        const trips = tripsResponse.data;
        const galleryProfileElement = document.getElementById('gallery-trips') as HTMLElement;
        galleryProfileElement.innerHTML = galleryTemplateTrips({ trips, openIcon, tripIcon, copyLinkIcon, deleteIcon, myBlackIcon, editIcon });

        document.querySelectorAll('.trips-open-icon').forEach(icon => {
            icon.addEventListener('click', () => {
                icon.classList.toggle('open');
                const parentItem = icon.closest('.gallery-item-trips');
                if (parentItem) {
                    parentItem.classList.toggle('open');
                }
            });
        });

        document.querySelectorAll('.trips-delete-icon').forEach(icon => {
            icon.addEventListener('click', async () => {
                icon.classList.toggle('open');
                const parentItem = icon.closest('.gallery-item-trips');
                if (parentItem) {
                    const id = parentItem.id;
                    const res = await Api.deleteTrip(id);
                    if (res.ok) {
                        router.goto('/trips');
                    }
                }
            });
        });

        document.querySelectorAll('.trips-edit-icon').forEach(icon => {
            icon.addEventListener('click', async () => {
                icon.classList.toggle('open');
                const parentItem = icon.closest('.gallery-item-trips');
                if (parentItem) {
                    Trip.id = parentItem.id;
                    router.goto('/edittrip');
                }
            });
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
