import Api from '../utils/Api.js';
import User from '../utils/user.js';

export default {
    /**
     * HTML-шаблон для отображения страницы с заголовком и галереей достопримечательностей.
     * Включает заголовок, кнопку для авторизации и место для динамически загружаемых данных.
     *
     * @type {string}
     */
    html:
        `<header class="header">
            <div class="logo" >
                <img src="/src/static/logo.png" alt="Логотип" class="logo-image">
            </div>
            <div class="auth">
                <button class="login-button" id="signin-button">вход</button>
            </div>
        </header>
        <main>
            <div class="headline">
                Достопримечательности
            </div>
            <ul class="gallery" id="gallery">
                
            </ul>
        </main>`,

    /**
     * Функция для монтирования страницы и привязки логики к элементам.
     * Добавляет обработчик клика для перехода на страницу входа и загружает данные
     * о достопримечательностях для отображения в галерее с использованием Handlebars-шаблона.
     *
     * @param {Router} router - Экземпляр роутера для управления навигацией между страницами.
     * @returns {Promise<void>} Промис, который выполняется после успешного монтирования страницы.
     */
    async mount(router) {

        document.getElementById('signin-button').addEventListener('click', () => {
            router.goto('/signin');
        });

        const attractionsResponse = await Api.getAttractions();
        const attractions = attractionsResponse.data;

        const templateSource = `
            {{#each attractions}}
                <li class="gallery-item">
                    <img src="{{image}}" alt="{{name}}">
                    <p>{{name}}</p>
                </li>
            {{/each}}`;
        const template = Handlebars.compile(templateSource);

        document.getElementById('gallery').innerHTML = template({attractions});

        const currentUser = await Api.getUser();

        if (currentUser.data.login) {
            User.username = currentUser.data.login;
            User.id = currentUser.data.id;
        }

        if (User.username !== '') {
            document.getElementById('signin-button').textContent = User.username;
        }
    },

    /**
     * Функция размонтирования страницы.
     * Используется для удаления обработчиков событий и очистки состояния при переходе на другую страницу.
     */
    unmount() {

    },
};
