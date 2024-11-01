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
                <img src="/src/static/logo.png" alt="Логотип" class="logo-image" id="home-logo">
            </div>
        </header>
        <main>
            <div class="profile-block">
                <img src="/avatar.png" alt="Аватар" class="avatar">
                <div class="information-block"></div>
                <div class="information-block">
                    <div class="information-row">
                        <div class="information-text-title">Логин</div>
                        <div class="information-text">Здесь будет Логин</div>
                    </div>
                    <div class="information-row">
                        <div class="information-text-title">Email</div>
                        <div class="information-text">Здесь будет Email</div>
                    </div>
                    <div class="information-row">
                        <div class="information-text-title">ID</div>
                        <div class="information-text">Здесь будет ID</div>
                    </div>
                </div>
                <div class="information-back-button" id="back-button">←</div>
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
    },

    /**
     * Функция размонтирования страницы профиля.
     * Используется для очистки состояния или удаления обработчиков событий при переходе на другую страницу.
     */
    unmount() {
        // Оставлено пустым, так как текущая реализация не требует очистки обработчиков.
    },
};
