import Router from '../utils/Router'
export default {
    /**
     * HTML-шаблон страницы ошибки 404, отображающей сообщение об ошибке и кнопку для перехода на главную страницу.
     *
     * @type {string}
     */
    html:
        `<header class="header">
            <div class="logo" >
                <img src="/src/static/logo.png" alt="Логотип" class="logo-image">
            </div>
        </header>
        <main class="warn-message">
            <div class="warning">Упс, такой страницы нет...</div>
            <button class="unknown-page-button" id="error-button">На главную</button>
        </main>`,

    /**
     * Функция монтирования страницы ошибки 404.
     * Добавляет обработчик клика для кнопки, чтобы пользователь мог вернуться на главную страницу.
     *
     * @param {Router} router - Экземпляр роутера для управления навигацией.
     */
    async mount(router: Router): Promise<void> {
        const errorButton = document.getElementById('error-button')
        errorButton!.addEventListener('click', () => {
            router.goto('/home');
        });
    },

    /**
     * Функция размонтирования страницы ошибки 404.
     * Может использоваться для очистки состояния или удаления обработчиков событий при переходе на другую страницу.
     */
    unmount() {

    },
};
