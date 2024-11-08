import Router from '../utils/Router';
import Api from '../utils/Api';
import User from '../utils/user';
import logoImage from '../static/logo.png';

export default {
    html: `<header class="header">
                <div class="logo">
                    <img src="${logoImage}" alt="Логотип" class="logo-image" id="logo-image">
                </div>
                <div class="header-menu">
                    <button class="header-button" id="trips-button">Поездки</button>
                    <button class="header-button" id="signin-button">Вход</button>
                    <button class="user-button" id="user-button"></button>
                
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
                </div>
            </header>`,

    async mount(router: Router): Promise<void> {
        const homeLogo = document.getElementById('logo-image') as HTMLElement;
        const signinButton = document.getElementById('signin-button') as HTMLButtonElement;
        const userButton = document.getElementById('user-button') as HTMLButtonElement;
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
        signinButton.textContent = 'Сменить пользователя';
        userButton.textContent = User.username;
        userNameDiv.textContent = User.username;
        userButton.classList.add('show');
        signinButton.classList.add('hidden');
    }
};