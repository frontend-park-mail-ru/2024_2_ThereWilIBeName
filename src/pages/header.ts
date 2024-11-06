import Router from '../utils/Router';
import Api from '../utils/Api';
import User from '../utils/user';

export default async function mountHeader(router: Router,sideMenu: HTMLElement, userButton: HTMLButtonElement, closeButton: HTMLButtonElement, backgroundMenu: HTMLElement, profileButton: HTMLButtonElement, changeUserButton: HTMLButtonElement, signinButton: HTMLButtonElement, logoutButton: HTMLButtonElement, homeLogo: HTMLElement) {

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
};
