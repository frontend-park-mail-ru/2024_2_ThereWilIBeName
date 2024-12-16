import Router from '../utils/Router';
import Api from '../utils/Api';
import User from '../utils/user';
import logoImage from '../static/logo trip black.svg';
import avatarPng from '../static/avatar.png';
import search from './search/search';
import userMount from './user-mount';

export default {
    html: `<header class="header">
                <div class="logo logo-grid">
                    <img src="${logoImage}" alt="Логотип" class="logo-image-black" id="logo-image">
                </div>
                ${search.html}
                <button class="trips-button trips-grid" id="trips-button">Поездки</button>
                <button class="header-button user-grid" id="signin-button">Вход</button>
                <div class="user-button user-grid" id="user-button">
                    <img src="${avatarPng}" class="avatar" alt="Аватарка" id="avatar">
                </div>
                <div id="side-menu" class="side-menu">
                    <div class="background-menu" id="background-menu"></div>
                    <div class="user-name" id="user-name"></div>
                    <ul>
                        <li><button class="menu-button" id="change-user-button">Сменить пользователя</button></li>
                        <li><button class="menu-button" id="profile-button">Профиль</button></li>
                        <li><button class="menu-button" id="logout-button">Выйти</button></li>
                    </ul>
                    <button id="menu-close-button" class="menu-close-button">←</button>
                </div>
            </header>`,

    async mount(router: Router): Promise<void> {
        const homeLogo = document.getElementById('logo-image') as HTMLElement;
        const signinButton = document.getElementById('signin-button') as HTMLButtonElement;
        const userButton = document.getElementById('user-button') as HTMLButtonElement;
        const avatarImage = document.getElementById('avatar') as HTMLImageElement;
        const sideMenu = document.getElementById('side-menu') as HTMLElement;
        const userNameDiv = document.getElementById('user-name') as HTMLElement;
        const backgroundMenu = document.getElementById('background-menu') as HTMLElement;
        const profileButton = document.getElementById('profile-button') as HTMLButtonElement;
        const closeButton = document.getElementById('menu-close-button') as HTMLButtonElement;
        const logoutButton = document.getElementById('logout-button') as HTMLButtonElement;
        const changeUserButton = document.getElementById('change-user-button') as HTMLButtonElement;
        const tripsButton = document.getElementById('trips-button') as HTMLButtonElement;

        await search.mount(router);

        tripsButton.addEventListener('click', () => {
            router.goto('/mytrips');
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
                localStorage.removeItem('token');
                User.username = '';
                User.id = '';
                User.email = '';
                User.avatarPath = '';
                User.isSignedIn = false;
                userButton.classList.remove('show');
                signinButton.classList.remove('hidden');
                await router.goto('/home');
            }
        });

        try {
            await userMount();

            if (User.isSignedIn) {
                if (User.avatarPath !== '') {
                    avatarImage.src = `/avatars/${User.avatarPath}`;
                }
                userNameDiv.textContent = User.username;
                userButton.classList.add('show');
                signinButton.classList.add('hidden');
            }


        } catch (error) {
            console.log('Пользователь не авторизован');
        }

    }
};
