import Router from '../utils/Router';

export default {
    /**
     * HTML-шаблон для страницы профиля с предупреждающим сообщением и кнопкой
     * для перехода на главную страницу.
     *
     * @type {string}
     */
    html: `<header class="header">
            <div class="logo">
                <img src="/logo.png" alt="Логотип" class="logo-image">
            </div>
        </header>
        <main class="warn-message">
            <div class="warning">Здесь будет профиль :)</div>
            <button class="unknown-page-button" id="error-button">На главную</button>
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
        const errorButton = document.getElementById('error-button');
        errorButton!.addEventListener('click', () => {
            router.goto('/home');
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
