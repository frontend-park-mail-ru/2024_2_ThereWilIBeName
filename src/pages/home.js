import Api from '../utils/Api.js';

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
                <button class="login-button" id="signinButton">вход</button>
            </div>
        </header>
        <main>
            <div class="headline">
                Достопримечательности
            </div>
            <ul class="gallery" id="gallery">
                
            </ul>
             
        </main>
        <script id="gallery-item-template" type="text/x-handlebars-template">
            {{#each attractions}}
                <li class="gallery-item">
                    <img src="{{image}}" alt="{{name}}">
                    <p>{{name}}</p>
                </li>
            {{/each}}
        </script>`,

    /**
     * Функция для монтирования страницы и привязки логики к элементам.
     * Добавляет обработчик клика для перехода на страницу входа и загружает данные
     * о достопримечательностях для отображения в галерее с использованием Handlebars-шаблона.
     *
     * @param {Router} router - Экземпляр роутера для управления навигацией между страницами.
     * @returns {Promise<void>} Промис, который выполняется после успешного монтирования страницы.
     */
    async mount(router) {
        document.getElementById('signinButton').addEventListener('click', () => {
            router.goto('/signin');
        });

        const attractionsResponse = await Api.getAttractions();
        const attractions = attractionsResponse.data;

        const templateSource = document.getElementById('gallery-item-template').innerHTML;
        const template = Handlebars.compile(templateSource);

        document.getElementById('gallery').innerHTML = template({attractions});
    },

    /**
     * Функция размонтирования страницы.
     * Используется для удаления обработчиков событий и очистки состояния при переходе на другую страницу.
     */
    unmount() {

    },
};
