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
import palmsImg from '../../static/please white.svg';
import palmsImgB from '../../static/please black.svg';
import User from '../../utils/user';
import Trip from '../../utils/trip';
import header from '../../components/header';
import backButton from '../../static/back button white.svg';
import footer from '../../components/footer';

export default {
    /**
     * HTML-шаблон для страницы профиля с предупреждающим сообщением и кнопкой
     * для перехода на главную страницу.
     *
     * @type {string}
     */
    html: `${header.html}
        <main>
            <div class="trips-block">
                <div class="trips-title-row">
                    <img src="${backButton}" class="trips-back-button" id="back-button">
                    <div class="trips-title">Поездки</div>
                </div>
                <hr>
                <div class="trips-button-row">
                    <div class="trip-create-button hidden" id="trip-create-button">+</div>
                </div>
                <div id="trips-root">
                    <div class="please-block hidden" id="please-block">
                        <img src="${palmsImg}" class="please-img">
                        <div class="auth-please" id="auth-please">Пожалуйста, авторизуйтесь</div>
                    </div>
                    <ul class="gallery-trips" id="gallery-trips"></ul>
                </div>
            </div>
        </main>
        ${footer.html}
`,

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
        const authPleaseBlock = document.getElementById('please-block') as HTMLElement;

        // Монтирование хэдера
        await header.mount(router);

        backButton.addEventListener('click', () => {
            router.goto('/home');
        });

        createTripButton.addEventListener('click', () => {
            router.goto('/createtrip');
        });

        if (User.username === '') {
            return;
        }

        const tripsResponse = await Api.getUserTrips(User.id);

        if (tripsResponse.ok) {
            authPleaseBlock.classList.remove('hidden');
            createTripButton.classList.remove('hidden');
            const trips = tripsResponse.data;
            const galleryProfileElement = document.getElementById('gallery-trips') as HTMLElement;
            galleryProfileElement.innerHTML = galleryTemplateTrips({ trips, openIcon, tripIcon, copyLinkIcon, deleteIcon, palmsImg, editIcon });
        }

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
