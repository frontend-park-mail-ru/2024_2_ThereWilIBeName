import Router from '../utils/Router';

export default {
    /**
     * HTML-шаблон страницы ошибки 404, отображающий сообщение об ошибке и кнопку
     * для перехода на главную страницу.
     *
     * @type {string}
     */
    html:
        `<header class="header">
            <div class="logo">
                <img src="/src/static/logo.png" alt="Логотип" class="logo-image">
            </div>
        </header>
        <main class="warn-message">
            <div class="warning">Упс, такой страницы нет...</div>
            <button class="unknown-page-button" id="error-button">На главную</button>
        </main>`,

    /**
     * Функция монтирования страницы ошибки 404.
     * Добавляет обработчик события клика для кнопки, чтобы пользователь мог вернуться на главную страницу.
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
     * Функция размонтирования страницы ошибки 404.
     * Используется для очистки состояния или удаления обработчиков событий при переходе на другую страницу.
     */
    unmount() {
        // Оставлено пустым, так как текущая реализация не требует очистки обработчиков.
    },
};
