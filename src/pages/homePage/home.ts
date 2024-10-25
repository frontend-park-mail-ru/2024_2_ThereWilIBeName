import Api from '../../utils/Api';
import User from '../../utils/user';
import Router from '../../utils/Router';
import galleryTemplate from './home.hbs';

export default {
    html: `
        <header class="header">
            <div class="logo">
                <img src="/src/static/logo.png" alt="Логотип" class="logo-image">
            </div>
            <div class="header-menu">
                <button class="header-button" id="signin-button">вход</button>
                <button class="user-button" id="user-button"></button>
                
                <div id="side-menu" class="side-menu">
                    <div class="background-menu" id="background-menu"></div>
                    <div class="user-name" id="user-name"></div>
                    <ul>
                        <li><button class="menu-button" id="profile-button">Профиль</button></li>
                        <li><button class="menu-button" id="logout-button">Выйти</button></li>
                    </ul>
                    <button id="close-button" class="close-button">Закрыть</button>
                </div>
                
            </div>
        </header>
        <main>
            <div class="headline">Достопримечательности</div>
            <ul class="gallery" id="gallery"></ul>
        </main>`,

    async mount(router: Router): Promise<void> {
        const profileButton = document.getElementById('profile-button')!;
        const logoutButton = document.getElementById('logout-button')!;
        const signinButton = document.getElementById('signin-button')!;

        const userNameDiv = document.getElementById('user-name')!;
        const userButton = document.getElementById('user-button')!;
        const sideMenu = document.getElementById('side-menu')!;
        const closeButton = document.getElementById('close-button')!;
        const backgroundMenu = document.getElementById('background-menu')!;

        // Открытие меню при клике на кнопку
        userButton.addEventListener('click', () => {
            sideMenu.classList.add('open');
        });

        closeButton.addEventListener('click', () => {
            sideMenu.classList.remove('open');
        });
        backgroundMenu.addEventListener('click', () => {
            sideMenu.classList.remove('open');
        });

        profileButton.addEventListener('click', () => {
            router.goto('/profile');
        });

        logoutButton.addEventListener('click', async () => {
            await Api.deleteUser(User.username, User.id);
            User.username = '';
            User.id = '';
            User.email = '';
            location.reload();
        });

        signinButton.addEventListener('click', () => {
            router.goto('/signin');
        });

        const currentUser = await Api.getUser();

        if (!currentUser.ok) {
            return;
        }
        User.username = currentUser.data.username;
        User.id = currentUser.data.id;
        signinButton.textContent = 'Сменить пользователя';
        userButton.textContent = User.username;
        userNameDiv.textContent = User.username;
        userButton.classList.add('show');

        const attractionsResponse = await Api.getAttractions();
        const attractions = attractionsResponse.data;
        document.getElementById('gallery')!.innerHTML = galleryTemplate({ attractions });
    },

    unmount() {
    },
};
