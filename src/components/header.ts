import Router from '../utils/Router';
import Api from '../utils/Api';
import User from '../utils/user';
import logoImage from '../static/logo trip black.svg';
import searchButton from '../static/search button.svg';

export default {
    html: `<header class="header">
                <div class="logo">
                    <img src="${logoImage}" alt="Логотип" class="logo-image-black" id="logo-image">
                </div>
                <div class="search">
                    <input type="text" placeholder="Здесь будет поиск" class="search-input">
                    <img src="${searchButton}" alt="Поиск" class="search-button" id="search-button">
                </div>
                <button class="header-button" id="trips-button">Поездки</button>
                <button class="header-button" id="signin-button">Вход</button>
                <div class="user-button" id="user-button">
                    <img class="avatar" alt="Аватарка">
                </div>
            
                <div id="side-menu" class="side-menu">
                    <div class="background-menu" id="background-menu"></div>
                    <div class="user-name" id="user-name"></div>
                    <ul>
                        <li><button class="menu-button" id="change-user-button">Сменить пользователя</button></li>
                        <li><button class="menu-button" id="profile-button">Профиль</button></li>
                        <li><button class="menu-button" id="logout-button">Выйти</button></li>
                    </ul>
                    <button id="close-button" class="close-button">Закрыть</button>
                </div>
            </header>`,

    async mount(router: Router): Promise<void> {
        const homeLogo = document.getElementById('logo-image') as HTMLElement;
        const signinButton = document.getElementById('signin-button') as HTMLButtonElement;
        const userButton = document.getElementById('user-button') as HTMLImageElement;
        const sideMenu = document.getElementById('side-menu') as HTMLElement;
        const userNameDiv = document.getElementById('user-name') as HTMLElement;
        const backgroundMenu = document.getElementById('background-menu') as HTMLElement;
        const profileButton = document.getElementById('profile-button') as HTMLButtonElement;
        const closeButton = document.getElementById('close-button') as HTMLButtonElement;
        const logoutButton = document.getElementById('logout-button') as HTMLButtonElement;
        const changeUserButton = document.getElementById('change-user-button') as HTMLButtonElement;
        const tripsButton = document.getElementById('trips-button') as HTMLButtonElement;

        tripsButton.addEventListener('click', () => {
            router.goto('/trips');
        });

        homeLogo.addEventListener('click', () => {
            router.goto('/home');
        });

        signinButton.addEventListener('click', () => {
            router.goto('/signin');
        });

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

        changeUserButton.addEventListener('click', () => {
            router.goto('/signin');
        });

        logoutButton.addEventListener('click', async () => {
            const resLogout = await Api.postLogout(User.username, User.id);
            if (resLogout.ok) {
                User.username = '';
                User.id = '';
                User.email = '';
                User.isSignedIn = false;
                userButton.classList.remove('show');
                signinButton.classList.remove('hidden');
                await router.goto('/home');
            }
        });

        // Получение информации о текущем пользователе
        const currentUser = await Api.getUser();

        if (!currentUser.ok) {
            console.log('Пользователь не авторизован');
            return;
        }
        User.username = currentUser.data.username;
        User.id = currentUser.data.id;
        User.email = currentUser.data.email;
        User.isSignedIn = true;
        signinButton.textContent = 'Сменить пользователя';
        const avatarPath = (await Api.getProfile(User.id)).data.avatarPath;
        if (avatarPath) {
            userButton.src = avatarPath;
        }
        userNameDiv.textContent = User.username;
        userButton.classList.add('show');
        signinButton.classList.add('hidden');
    }
};
