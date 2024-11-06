import Router from '../../utils/Router';
import galleryTemplateTrips from './trips.hbs';
import Api from '../../utils/Api';

import logoImage from '../../static/logo.png';
import openIcon from '../../static/open.png';
import tripIcon from '../../static/trip_icon.png';
import copyLinkIcon from '../../static/copylink.png';
import shareIcon from '../../static/share.png';
import deleteIcon from '../../static/delete.png';
import User from '../../utils/user';

export default {
    /**
     * HTML-шаблон для страницы профиля с предупреждающим сообщением и кнопкой
     * для перехода на главную страницу.
     *
     * @type {string}
     */
    html: `<header class="header">
            <div class="logo">
                <img src="${logoImage}" alt="Логотип" class="logo-image" id="home-logo">
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
                    <div class="trip-create-button" id="trip-create-button">+</div>
                </div>
                <div id="trips-root">
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
        const homeLogo = document.getElementById('home-logo') as HTMLElement;
        homeLogo.addEventListener('click', () => {
            router.goto('/home');
        });

        const backButton = document.getElementById('back-button') as HTMLButtonElement;
        backButton.addEventListener('click', () => {
            router.goto('/home');
        });

        const createTripButton = document.getElementById('trip-create-button') as HTMLButtonElement;
        createTripButton.addEventListener('click', () => {
            router.goto('/createtrip');
        });

        const tripsResponse = await Api.getUserTrips(User.id);

        const trips = tripsResponse.data;
        const galleryProfileElement = document.getElementById('gallery-trips') as HTMLElement;
        galleryProfileElement.innerHTML = galleryTemplateTrips({ trips, openIcon, tripIcon, copyLinkIcon, deleteIcon });

        document.querySelectorAll('.trips-open-icon').forEach(icon => {
            icon.addEventListener('click', () => {
                icon.classList.toggle('open');
                const parentItem = icon.closest('.gallery-item-trips');
                if (parentItem) {
                    parentItem.classList.toggle('open');
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
