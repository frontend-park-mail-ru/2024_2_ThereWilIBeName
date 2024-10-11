import Api from '../utils/Api.js';
import User from '../utils/user.js';
import Router from '../utils/Router.js';

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
                <div class="user-menu" id="user-menu" style="display: none;">
                    <button class="profile-button" id="user-button"></button>
                    <div class="dropdown" id="dropdown" style="display: none;">
                        <button id="profile-button">Профиль</button>
                        <button id="logout-button">Выход</button>
                    </div>
                </div>
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
    async mount(router: Router): Promise<void> {
        const userMenu = document.getElementById('user-menu')!;
        const userButton = document.getElementById('user-button')!;
        const dropdown = document.getElementById('dropdown')!;
        const profileButton = document.getElementById('profile-button')!;
        const logoutButton = document.getElementById('logout-button')!;

        // Обработчик клика по кнопке с именем пользователя для открытия меню
        userButton.addEventListener('click', () => {
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        });

        // Переход на страницу профиля
        profileButton.addEventListener('click', () => {
            router.goto('/profile');
        });

        // Обработчик для выхода из аккаунта
        logoutButton.addEventListener('click', async () => {
            // await Api.logout(); // Логика выхода
            location.reload();  // Перезагрузить страницу после выхода
        });


        const signinButton = document.getElementById('signin-button')
        signinButton!.addEventListener('click', () => {
            router.goto('/signin')
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

        document.getElementById('gallery')!.innerHTML = template({attractions});

        // const currentUser = await Api.getUser();
        const currentUser = {
            data: {
                username: 'test',
                id: '0',
            }
        }

        if (currentUser.data.username) {
            User.username = currentUser.data.username;
            User.id = currentUser.data.id;
        }

        if (User.username !== '') {
            signinButton!.textContent = 'Сменить пользователя';
            userButton.textContent = User.username;
            userMenu.style.display = 'block';
        }
    },

    /**
     * Функция размонтирования страницы.
     * Используется для удаления обработчиков событий и очистки состояния при переходе на другую страницу.
     */
    unmount() {

    },
};
