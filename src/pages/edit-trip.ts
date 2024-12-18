import Api from '../utils/Api';
import Router from '../utils/Router';
import User from '../utils/user';

import logoImage from '../static/logo trip.svg';
import footer from '../components/footer';
import backButton from '../static/back button white.svg';

export default {
    /**
     * HTML-шаблон для страницы регистрации, содержащий форму для ввода логина, email, пароля
     * и подтверждения пароля, а также элементы для навигации на другие страницы.
     *
     * @type {string}
     */
    html:
        `
        <img src="${logoImage}" alt="Логотип" class="logo-image" id="home-logo">
        <main>
            <div class="create-trip-block">
                <img src="${backButton}" class="back-button" id="back-button">
                <div class="create-trip-title">Редактирование</div>
                <div class="error-message" id="error-message">ЗДЕСЬ БУДЕТ ОШИБКА</div>
                <form id="create-trip-form" class="create-trip-form">
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
                    <button class="create-trip-button">Изменить поездку</button>
                </form>
            </div>
        </main>
        ${footer.html}    
`,

    /**
     * Функция для монтирования страницы регистрации.
     * Подключает обработчики событий для элементов страницы и обрабатывает логику регистрации.
     *
     * @async
     * @param {Router} router - Экземпляр класса Router для навигации между страницами.
     * @param params
     * @returns {Promise<void>} Промис, который выполняется после установки всех обработчиков событий на странице.
     */
    async mount(router: Router, params: number): Promise<void> {
        const itemId: number = params;

        const backButton = document.getElementById('back-button') as HTMLButtonElement;
        backButton.addEventListener('click', () => {
            router.goto(`/trips/${itemId}`);
        });

        const homeLogo = document.getElementById('home-logo') as HTMLElement;
        homeLogo.addEventListener('click', () => {
            router.goto('/home');
        });

        const resTrip = await Api.getTrip(itemId);

        const formName = (document.getElementById('name') as HTMLInputElement);
        formName.value = resTrip.data.trip.name;
        const formDescription = (document.getElementById('description') as HTMLInputElement);
        formDescription.value = resTrip.data.trip.description;
        const formStartDate = (document.getElementById('startDate') as HTMLInputElement);
        formStartDate.value = resTrip.data.trip.startDate;
        const formEndDate = (document.getElementById('endDate') as HTMLInputElement);
        formEndDate.value = resTrip.data.trip.endDate;
        const formPrivateTrip = (document.getElementById('private-trip') as HTMLInputElement);
        formPrivateTrip.checked = resTrip.data.trip.private;
        const createTripForm = document.getElementById('create-trip-form') as HTMLElement;
        const errorMessage = document.getElementById('error-message') as HTMLElement;

        createTripForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            try {
                const res = await Api.putTrip(itemId, Number(User.id), formName.value, 1, formDescription.value, formStartDate.value, formEndDate.value, formPrivateTrip.checked);
                await router.goto(`/trips/${itemId}`);
            } catch (e) {
                errorMessage.textContent = 'Ошибка создания поездки';
                errorMessage.classList.add('visible');
            }
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
