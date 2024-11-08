import Api from '../utils/Api';
import Router from '../utils/Router';
import User from '../utils/user';
import Trip from '../utils/trip';

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
            <div class="create-trip-block">
                <div class="back-button" id ="back-button">←</div>
                <div class="create-trip-title">Редактирование поездки</div>
                <div class="error-message" id="error-message">ЗДЕСЬ БУДЕТ ОШИБКА</div>
                <form id="create-trip-form">
                    <label class="create-trip-text">Название</label>
                    <input class="border" id="name" name="name" >
                    <label class="create-trip-text">Описание</label>
                    <textarea class="border description" id="description" name="description" ></textarea>
                    <label class="create-trip-text">Дата начала</label>
                    <input class="border" type="date" id="startDate" name="startDate">
                    <label class="create-trip-text">Дата конца</label>
                    <input class="border" type="date" id="endDate" name="endDate">
                    <label class="create-trip-text checkbox-button">
                        <input type="checkbox" id="private-trip" name="private-trip"> Приватная поездка
                    </label>
                    <button class="create-trip-button">Создать поездку</button>
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
            router.goto('/trips');
        });

        const homeLogo = document.getElementById('home-logo') as HTMLElement;
        homeLogo.addEventListener('click', () => {
            router.goto('/home');
        });

        const createTripForm = document.getElementById('create-trip-form') as HTMLElement;
        const errorMessage = document.getElementById('error-message') as HTMLElement;

        createTripForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formUserId = Number(User.id);
            const formName = (document.getElementById('name') as HTMLInputElement).value;
            const formDescription = (document.getElementById('description') as HTMLInputElement).value;
            const formStartDate = (document.getElementById('startDate') as HTMLInputElement).value;
            const formEndDate = (document.getElementById('endDate') as HTMLInputElement).value;
            const formPrivateTrip = (document.getElementById('private-trip') as HTMLInputElement).checked;


            const res = await Api.putTrip(Trip.id, formUserId, formName, 1, formDescription, formStartDate, formEndDate, formPrivateTrip);

            // if (res.ok!) {
            //     errorMessage.textContent = 'Неизвестная ошибка';
            //     errorMessage.classList.add('visible');
            //     return;
            // }

            await router.goto('/trips');
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
